import Feed from "./feed/Feed"
import Sidebar from "./sidebar/Sidebar"

type Props = {}

export default function Body({}: Props) {
  return (
    <div className= "container max-w-6xl flex flex-col md:flex-row pt-6">
      <Feed />
      <Sidebar />
    </div>
  )
}