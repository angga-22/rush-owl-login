import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "@/views/LoginPage";
import { AuthProvider } from "@/usecases/auth/useAuth";

describe("LoginPage", () => {
  test("renders the LoginPage component", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );
  });
});
