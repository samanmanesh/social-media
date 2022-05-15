import { Link } from "react-router-dom";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <div className="w-full h-screen">
      <div className="grid h-[90%]">
        <div className="container max-w-xs flex flex-col justify-center p-8 space-y-5 items-center border-2 rounded self-center">
          <h1 className="font-freehand text-5xl p-4">Hilarion</h1>
          <p className="text-gray-400 text-lg font-semibold">
            Sign up to see photos and videos from your friends.
          </p>
          <form action="" className="flex flex-col w-full space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="border rounded-[2px] border-gray-300 w-full h-full p-1.5 bg-gray-100 "
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="border rounded-[2px] border-gray-300 w-full h-full p-1.5 bg-gray-100 "
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border rounded-[2px] border-gray-300 p-1.5 bg-gray-100"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border rounded-[2px] border-gray-300 p-1.5 bg-gray-100"
              required
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
