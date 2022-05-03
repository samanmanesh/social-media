import ProfileGallery from '../../components/profile/profilegallery/ProfileGallery';
import ProfileHeader from '../../components/profile/profileheader/ProfileHeader';

type Props = {}

const ProfilePage = (props: Props) => {
  return (
    <div className=' container flex flex-col'>
      <ProfileHeader />
      <ProfileGallery />
    </div>
  )
}

export default ProfilePage;