import Feed from "./feed/Feed"
import Sidebar from "./sidebar/Sidebar"

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Body({...props}: Props) {
  return (
    <div {...props} className= "container max-w-6xl flex flex-col md:flex-row pt-6">
      <Feed />
      <Sidebar />
    </div>
  )
}