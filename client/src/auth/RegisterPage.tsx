import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { registerUser } from "api/register";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./utils";
type Props = {};

const RegisterPage = (props: Props) => {
  const email = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  //@ts-ignore
  const from = location.state?.from?.pathname || "/";

  const { setUser } = useAuth();

  const { mutate, error, isLoading } = useMutation(registerUser, {
    onSuccess: ({ data }) => {
      setUser(data);
      redirect();
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  const redirect = () => {
    navigate(from, { replace: true });
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (
      username.current &&
      password.current &&
      email.current &&
      confirmPassword.current
    ) {
      if (password.current?.value !== confirmPassword.current?.value) {
        // password.current.setCustomValidity("Passwords do not match!");
        confirmPassword.current.setCustomValidity("Passwords do not match!");
      } else {
        //Password matched.
        const user = {
          username: username.current.value,
          password: password.current.value,
          email: email.current.value,
        };
        mutate(user);

        //clean the form
        email.current.value = "";
        username.current.value = "";
        password.current.value = "";
        confirmPassword.current.value = "";
      }
    }
  };

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="w-full h-screen">
      <div className="grid h-[90%]">
        <div className="container max-w-xs flex flex-col justify-center p-8 space-y-5 items-center border-2 rounded self-center">
          <h1 className="font-freehand text-5xl p-4">Hilarion</h1>
          <p className="text-gray-400 text-lg font-semibold">
            Sign up to see photos and videos from your friends.
          </p>
          <form
            action=""
            className="flex flex-col w-full space-y-4"
            onSubmit={onSubmit}
          >
            <input
              type="email"
              placeholder="Email"
              ref={email}
              className="border rounded-[2px] border-gray-300 w-full h-full p-1.5 bg-gray-100"
              required
            />
            <input
              type="text"
              placeholder="Username"
              ref={username}
              className="border rounded-[2px] border-gray-300 w-full h-full p-1.5 bg-gray-100"
              required
            />
             <div className=" relative flex items-center justify-end ">
            <input
              type={showPassword ? `password` : `text`}
              placeholder="Password"
              ref={password}
              className="border rounded-[2px] border-gray-300 p-1.5 bg-gray-100 w-full"
              required
              minLength={6}
              defaultValue="password"
            />
              {showPassword ? (
                <EyeIcon onClick={() => showPasswordToggle()} className="h-4 w-4 cursor-pointer absolute mx-2" />
                ) : (
                  <EyeOffIcon onClick={() => showPasswordToggle()} className="h-4 w-4 cursor-pointer absolute mx-2" />
              )}               
            </div>
            <div className=" relative flex items-center justify-end ">
              <input
                type={showPassword ? `password` : `text`}
                placeholder="Password Confirmation"
                ref={confirmPassword}
                className="border rounded-[2px] border-gray-300 p-1.5 bg-gray-100 w-full"
                required
                minLength={6}
                defaultValue="password"
              />
              {showPassword ? (
                <EyeIcon onClick={() => showPasswordToggle()} className="h-4 w-4 cursor-pointer absolute mx-2" />
                ) : (
                  <EyeOffIcon onClick={() => showPasswordToggle()} className="h-4 w-4 cursor-pointer absolute mx-2" />
              )}                
            </div>

            {isLoading ? (
              <span className="flex justify-center items-center space-x-2">
                <span>Loading</span>
                <svg
                  role="status"
                  className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-200 fill-black"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </span>
            ) : (
              <button
                type="submit"
                className="border p-0.5 bg-blue-500 text-white font-medium rounded-[4px] drop-shadow-lg"
              >
                Sign up
              </button>
            )}
          </form>
          <div className="w-full flex items-center  justify-between">
            <div className="  w-full border border-gray-300 "></div>
            <span className="px-3 bg-white text-sm">OR</span>
            <div className="border w-full border-gray-300"></div>
          </div>
          <div className="flex w-full justify-between ">
            <span>Have an account?</span>
            <Link to="/login" className="text-sm font-medium text-blue-500">
              Log in
            </Link>
          </div>
        </div>
      </div>
      <div className="text-gray-400 h-[10%] p-4 text-sm flex justify-center space-x-4">
        <span>© SAMAN MANESH</span>
        <span>2022</span>
      </div>
      <span></span>
    </div>
  );
};

export default RegisterPage;
