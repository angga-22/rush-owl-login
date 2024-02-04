import { useAuth } from "./useAuth";
import * as yup from "yup";
import { useReducer } from "react";
import { useNavigate } from "react-router";

interface IState {
  email: string;
  password: string;
  showPassword: boolean;
  errorPassword: string | boolean;
  errorEmail: string | boolean;
}

type Action =
  | { type: "SET_PASSWORD_VISIBLE"; payload: boolean }
  | { type: "SET_ERROR_EMAIL"; payload: string | boolean }
  | { type: "SET_ERROR_PASSWORD"; payload: string | boolean }
  | { type: "SET_PASSWORD_CHANGE"; payload: string }
  | { type: "SET_EMAIL_CHANGE"; payload: string };

const loginReducer = (state: IState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_PASSWORD_VISIBLE":
      return { ...state, showPassword: payload };
    case "SET_ERROR_EMAIL":
      return { ...state, errorEmail: payload };
    case "SET_ERROR_PASSWORD":
      return { ...state, errorPassword: payload };
    case "SET_PASSWORD_CHANGE":
      return { ...state, password: payload };
    case "SET_EMAIL_CHANGE":
      return { ...state, email: payload };
    default:
      return state;
  }
};

export const useLogin = () => {
  const [state, dispatch] = useReducer<React.Reducer<IState, Action>>(loginReducer, {
    email: ``,
    password: ``,
    showPassword: false,
    errorPassword: ``,
    errorEmail: ``,
  });

  const navigate = useNavigate();
  const { login, isLoading, errorLogin } = useAuth();

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const onTogglePassword = () => {
    dispatch({ type: "SET_PASSWORD_VISIBLE", payload: !state.showPassword });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_ERROR_PASSWORD", payload: `` });
    dispatch({ type: "SET_PASSWORD_CHANGE", payload: e.target.value });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_ERROR_EMAIL", payload: `` });
    dispatch({ type: "SET_EMAIL_CHANGE", payload: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    validationSchema
      .validate({ email, password }, { abortEarly: true })
      .then(() => {
        login({ email, password });
      })
      .catch((error) => {
        const passwordError = error.message.startsWith("Password");
        if (passwordError) {
          dispatch({ type: "SET_ERROR_PASSWORD", payload: error.message });
        } else {
          dispatch({ type: "SET_ERROR_EMAIL", payload: error.message });
        }
      });
  };

  return {
    handleSubmit,
    onTogglePassword,
    state,
    handlePasswordChange,
    handleEmailChange,
    isLoading,
    navigate,
    errorLogin,
  };
};
