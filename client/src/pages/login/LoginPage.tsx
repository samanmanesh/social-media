
type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className="flex flex-col p-2 justify-center items-center bg-blue-200">
      <h1 className="font-gemunu text-5xl p-4">Hilarion</h1>
      <form action="" className="flex flex-col p-4 ">
        <input type="text" placeholder="Username" className="border w-full h-full" />
        <input type="password" placeholder="Password"  className=" border"/>
        <button type="submit" className="border">Login</button>
      </form>

      <hr />

      <h2>Or</h2>
      <div className="flex flex-col">
        <span>Don't have an account?</span>
        <button>Sign up</button>
        </div>
    </div>
  )
}

export default LoginPage