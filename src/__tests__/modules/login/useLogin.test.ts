import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useLogin } from "@/usecases/auth/useLogin";
import { useAuth } from "@/usecases/auth/useAuth";

describe("useLogin", () => {
  const useAuthMock = vi.spyOn(useAuth, "useAuth");
  vi.mock("useAuth");

  beforeEach(() => {
    useAuthMock.mockClear();
  });

  it("should initialize state properly", () => {
    const { result } = renderHook(() => useLogin());
    expect(result.current.state).toEqual({
      email: "",
      password: "",
      showPassword: false,
      errorEmail: "",
      errorPassword: "",
    });
  });

  it("should toggle password visibility", () => {
    const { result, rerender } = renderHook(() => useLogin());
    act(() => {
      result.current.onTogglePassword();
    });
    expect(result.current.state.showPassword).toBe(true);
    rerender();
    act(() => {
      result.current.onTogglePassword();
    });
    expect(result.current.state.showPassword).toBe(false);
  });

  it("should handle password change", () => {
    const { result, rerender } = renderHook(() => useLogin());
    act(() => {
      result.current.handlePasswordChange({
        target: { value: "password123" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.state.password).toBe("password123");
    expect(result.current.state.errorPassword).toBe("");
    rerender();
    act(() => {
      result.current.handlePasswordChange({
        target: { value: "pass" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.state.password).toBe("pass");
    expect(result.current.state.errorPassword).toBe("Password must be at least 6 characters");
  });

  it("should handle email change", () => {
    const { result, rerender } = renderHook(() => useLogin());
    act(() => {
      result.current.handleEmailChange({
        target: { value: "test@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.state.email).toBe("test@example.com");
    expect(result.current.state.errorEmail).toBe("");
    rerender();
    act(() => {
      result.current.handleEmailChange({
        target: { value: "testexample.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.state.email).toBe("testexample.com");
    expect(result.current.state.errorEmail).toBe("Email is required");
  });
});
