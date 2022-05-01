import { DotsHorizontalIcon } from "@heroicons/react/solid";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function PostCard({ ...props }: Props) {
  return (
    <div {...props} className="min-w-[25rem] h-[30rem] w-full border border-gray-500 ">
      <div className="p-2 border-b border-black flex items-center justify-between">
        <div className="flex">
          <img
            src="./assets/people/jan-kopriva-GUNKCYNYXHA-unsplash.jpg"
            alt="profile"
            className=" w-7 h-7 rounded-full bg-cover"
          />
          <span className="pl-2">dualipa</span>
        </div>
        <button>
          <DotsHorizontalIcon className="w-3 h-3" />
        </button>
      </div>

      <div className="h-72 w-full ">
        <img
          src="./assets/post/img1.jpg"
          alt="post"
          className="object-contain max-h-72"
        />
      </div>
      <div className="p-2 border-y border-black w-full"> details</div>
      <div> comments</div>
    </div>
  );
}
