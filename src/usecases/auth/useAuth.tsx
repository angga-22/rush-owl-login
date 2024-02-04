import { ReactNode, createContext, useContext, useState } from "react";
import { axiosAuth } from "@/services/axios";

interface AuthContextProps {
  isAuthenticated: boolean;
  // eslint-disable-next-line no-unused-vars
  login: (credentials: LoginProps) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  resetPassword: (credentials: ResetPasswordProps) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  errorLogin: string | null;
  resetPasswordStatus: string | null;
}

interface ResetPasswordProps {
  email: FormDataEntryValue | null;
}

interface LoginProps {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("authKey")
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<string | null>("");
  const [resetPasswordStatus, setResetPasswordStatus] = useState<string | null>("");

  const login = async ({ email, password }: LoginProps): Promise<void> => {
    setIsLoading(true);
    setErrorLogin(null);
    try {
      const res = await axiosAuth.post(`/api/login`, {
        email,
        password,
      });
      if (res.status === 200) {
        await localStorage.setItem("authKey", res.data.result.token);
        await localStorage.setItem("userData", JSON.stringify(res.data.result.user_details));
        setIsAuthenticated(!!localStorage.getItem("authKey"));
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorLogin("Invalid email or Password");
      }
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    await localStorage.removeItem("authKey");
    await localStorage.removeItem("userData");
    setIsAuthenticated(!!localStorage.getItem("authKey"));
  };

  const resetPassword = async ({ email }: ResetPasswordProps): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await axiosAuth.post(`/api/forgot-password`, {
        email,
      });
      if (res.status === 200) {
        setResetPasswordStatus("SUCCESS");
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setResetPasswordStatus("FAILED");
      }
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={
        {
          isAuthenticated,
          login,
          resetPassword,
          logout,
          isLoading,
          errorLogin,
          resetPasswordStatus,
        } as AuthContextProps
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
