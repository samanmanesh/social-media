
type Props = {
  img: string;
}

const PostImage = ({img, ...props}: Props) => {
  return (
    <div className="">
        <img
          src={img}
          alt="post"
          className="object-cover max-h-[40rem] h-full w-full"
        />
      </div>
  )

}

export default PostImage;