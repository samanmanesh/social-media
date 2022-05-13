import { useContext, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { login, UserCredentials } from "../../api/login";
import {
  AuthContext,
  AuthUpdateContext,
} from "../../components/context/AuthContext";
type Props = {};

const LoginPage = (props: Props) => {
  // const { user, isFetching, error } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const updateAuthContext = useContext(AuthUpdateContext);

  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    email: "",
  } as UserCredentials);

  const { mutate, error, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      console.log("data", data);
      // put the user in the context
      updateAuthContext(data);
    },
  });

  let username = useRef<HTMLInputElement>(null);
  let password = useRef<HTMLInputElement>(null);

  // const fetchAuthLogin = async () => {
  //   const { data } = await login(userInput);
  //   return data;
  // };

  // const { data, isFetching, error } = useQuery(
  //   ["login", userInput],
  //   fetchAuthLogin
  // );

  // console.log("data", data);
  // console.log("isFetching", isFetching);
  // console.log("error", error);

  // const queryClient = useQueryClient();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // console.log("username", username.current?.value);
    // console.log("password", password.current?.value);
    if (username.current && password.current) {
      mutate({
        username: username.current?.value ?? "",
        password: password.current?.value ?? "",
        email: "",
      });
    }

    //   username.current.value = "";
    //   password.current.value = "";
    // }
  };

  return (
    <div className="w-full h-screen">
      <div className="grid h-[90%]">
        <div className="container max-w-xs flex flex-col justify-center p-8 space-y-5 items-center border-2 rounded self-center">
          <h1 className="font-freehand text-5xl p-4">Hilarion</h1>
          <form
            action=""
            className="flex flex-col w-full space-y-4"
            onSubmit={handleClick}
          >
            <input
              type="text"
              placeholder="Username"
              ref={username}
              className="border rounded-[2px] border-gray-300 w-full h-full p-1.5 bg-gray-200 "
              required
            />
            <input
              type="password"
              placeholder="Password"
              ref={password}
              required
              minLength={6}
              className="border rounded-[2px] border-gray-300 p-1.5 bg-gray-200"
            />
            <button
              type="submit"
              className="border p-0.5 bg-blue-500 text-white font-medium rounded-[4px] drop-shadow-lg"
            >
              Login
            </button>
          </form>
          <div className="w-full flex items-center  justify-between">
            <div className="  w-full border border-gray-300 "></div>
            <span className="px-3 bg-white text-sm">OR</span>
            <div className="border w-full border-gray-300"></div>
          </div>
          <div className="flex w-full justify-between ">
            <span>Don't have an account?</span>
            <Link to="/register" className="text-sm font-medium text-blue-500">
              Sign up
            </Link>
          </div>
          <button className="text-sm font-medium text-blue-500">
            Forgot password?
          </button>
        </div>
      </div>
      <div className="text-gray-400 h-[10%] p-4 text-sm flex justify-center space-x-4">
        <span>© SAMAN MANESH</span>
        <span>2022</span>
      </div>
    </div>
  );
};

export default LoginPage;
