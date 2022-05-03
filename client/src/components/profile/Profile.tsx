import ProfileHeader from './profileheader/ProfileHeader';
import ProfileGallery from './profilegallery/ProfileGallery';
type Props = {

}

const Profile = (props: Props) => {
  return (
    <div>
      <ProfileHeader />
      <ProfileGallery />
    </div>
  )
}

export default Profile