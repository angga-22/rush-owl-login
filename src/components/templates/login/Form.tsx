import Button from "@/components/atoms/Button";
import InputField from "@/components/atoms/InputField";
import { Link } from "react-router-dom";
import Image from "@/components/atoms/Image";
import { useLogin } from "@/usecases/auth/useLogin";
import Logo from "@/assets/images/rush-owl-logo.png";
import Lottie from "lottie-react";
import loading from "@/assets/lottie/loading-2.json";

const Form = () => {
  const {
    handleSubmit,
    handlePasswordChange,
    handleEmailChange,
    onTogglePassword,
    state,
    errorLogin,
    isLoading,
  } = useLogin();

  return (
    <div className="w-[100%] lg:w-[50%] mx-5">
      <div className="flex justify-center  ">
        <Image src={Logo} alt={"logo"} className={"w-[100] h-auto mr-2"} />
      </div>
      <div className="flex justify-center mt-[50px]">
        <div className="w-[90%] lg:w-[100%] flex-col min-w-0 break-words bg-white xl:bg-transparent border-0 lg:py-4  rounded-2xl bg-clip-border shadow-lg">
          <div className="p-6 pb-0 mb-0">
            <div className="font-bold text-2xl sm:text-3xl">Enter to Your Account</div>
            <div className="py-3">
              <p className="leading-normal text-sm sm:text-md">
                Enabling Worry-Free Journeys. Not have an account yet ?
                <Link
                  to="/login" // register
                  className="font-semibold text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-500 mx-1"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400">
              {state.errorEmail}
            </p>
          </div>
          <div className="px-6">
            <form role="form" onSubmit={handleSubmit}>
              <div className="flex items-center mb-5">
                <InputField
                  id="floating_email"
                  label="Email"
                  type="email"
                  className={`${state.errorEmail ? `border-red-500` : "border-gray-300"} `}
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmailChange(e)}
                  value={state.email}
                />
              </div>
              <div className="relative">
                <InputField
                  id="floating_password"
                  label="Password"
                  className={`${state.errorPassword ? `border-red-500` : "border-gray-300"} `}
                  type={state.showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePasswordChange(e)}
                  value={state.password}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <svg
                    className={`h-4 text-gray-700 ${state.showPassword ? `block` : "hidden"}`}
                    fill="none"
                    onClick={onTogglePassword}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="#424242"
                      d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                    ></path>
                  </svg>
                  <svg
                    className={`h-4 text-gray-700 ${!state.showPassword ? `block` : "hidden"}`}
                    fill="none"
                    onClick={onTogglePassword}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="#424242"
                      d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                    ></path>
                  </svg>
                </div>
              </div>
              <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400">
                {state.errorPassword || errorLogin}
              </p>
              <div className="pt-5 flex justify-between items-center text-left min-h-6 ">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 rounded"
                    type="checkbox"
                  />
                  <label className="text-sm s ml-2 font-normal cursor-pointer select-none text-slate-700">
                    Remember Me
                  </label>
                </div>
                <Link
                  to="/login" // forgot-pwd router
                  className="text-sm  font-semibold text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-500"
                >
                  <label className="text-sm s ml-2 font-normal cursor-pointer select-none text-slate-700">
                    Forgot Password?
                  </label>
                </Link>
              </div>
              <Button>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Lottie
                      animationData={loading}
                      loop={true}
                      style={{ width: 50, padding: 0, margin: 0 }}
                      autoPlay
                      autoSize={true}
                      resizeMode="center"
                    />
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
