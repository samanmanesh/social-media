type Props = {};

const ProfileGallery = (props: Props) => {
  
  const allImages = Array(10).fill(0);
  console.log(allImages);
  return (
    <div className="flex justify-center">
    <div className="grid md:grid-cols-3 gap-6 max-w-4xl flex-1 mt-6">
      {allImages.map((_, index) => (
        <div key={index} className=" aspect-square">
          <img src="./assets/post/img4.jpg" alt="post" className="object-cover w-full h-full"/>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ProfileGallery;
