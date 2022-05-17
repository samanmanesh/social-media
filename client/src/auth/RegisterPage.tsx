import { useRef } from "react";
import { Link } from "react-router-dom";

type Props = {};

const RegisterPage = (props: Props) => {
  const email = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("username", username.current?.value);
    console.log("password", password.current?.value);
    console.log("email", email.current?.value);
    console.log("confirmPassword", confirmPassword.current?.value);

    if (
      username.current &&
      password.current &&
      email.current &&
      confirmPassword.current
    ) {
      if (password.current?.value !== confirmPassword.current?.value) {
        console.log("password mismatch");
        // password.current.setCustomValidity("Passwords do not match!");
        confirmPassword.current.setCustomValidity("Passwords do not match!");

      } else {
        console.log("password match");
        const user = {
          username: username.current.value ,
          password: password.current.value,
          email: email.current.value,
        };



        //clean the form
        email.current.value = "";
        username.current.value = "";
        password.current.value = "";
        confirmPassword.current.value = "";
      }
    }
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
              className="border rounded-[2px] border-gray-300 w-full h-full p-1.5 bg-gray-100 "
              required
            />
            <input
              type="text"
              placeholder="Username"
              ref={username}
              className="border rounded-[2px] border-gray-300 w-full h-full p-1.5 bg-gray-100 "
              required
            />
            <input
              type="password"
              placeholder="Password"
              ref={password}
              className="border rounded-[2px] border-gray-300 p-1.5 bg-gray-100"
              required
              minLength={6}
            />
            <input
              type="password"
              placeholder="Password Confirmation"
              ref={confirmPassword}
              className="border rounded-[2px] border-gray-300 p-1.5 bg-gray-100"
              required
              minLength={6}
            />
            <button
              type="submit"
              className="border p-0.5 bg-blue-500 text-white font-medium rounded-[4px] drop-shadow-lg"
            >
              Sign up
            </button>
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
    </div>
  );
};

export default RegisterPage;
