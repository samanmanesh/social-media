type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className="container max-w-3xl my-auto bg-slate-100 ">
      <div className="flex flex-col justify-center items-center border-2 rounded bg-orange-400">
        <h1 className="font-gemunu text-5xl p-4">Hilarion</h1>
        <div className="flex flex-col justify-center items-center p-8 space-y-5">
          <form action="" className="flex flex-col w-full space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="border rounded-[2px] border-black w-full h-full p-1.5 bg-gray-200 "
            />
            <input
              type="password"
              placeholder="Password"
              className="border rounded-[2px] border-black p-1.5 bg-gray-200"
            />
            <button
              type="submit"
              className="border p-0.5 bg-blue-500 text-white font-medium rounded-[4px] drop-shadow-lg"
            >
              Login
            </button>
          </form>
          <div className=" border-b-2 border-black w-full h-2"></div>
          <h2 className=" bg-white  ">Or</h2>
          <div className="flex w-full justify-between ">
            <span>Don't have an account?</span>
            <button className="text-sm font-medium text-blue-500">
              Sign up
            </button>
          </div>
          <button className="text-sm font-medium text-blue-500">
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
