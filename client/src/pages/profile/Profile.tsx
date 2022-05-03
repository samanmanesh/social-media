
import Feed from '../../components/body/feed/Feed';
import Header from '../../components/header/Header';
type Props = {}

const Profile = (props: Props) => {
  return (
    <div>
      <Header />
      <Feed />
      <div>Users info</div>
      <div>Users feeds</div>

    </div>
  )
}

export default Profile;