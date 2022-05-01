import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { HeartIcon, AnnotationIcon } from "@heroicons/react/outline";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function PostCard({ ...props }: Props) {
  return (
    <div
      {...props}
      className=" min-w-[35rem]  border rounded border-gray-400 "
    >
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

      <div className="">
        <img
          src="./assets/post/img1.jpg"
          alt="post"
          className="object-cover max-h-[40rem] h-full w-full"
        />
      </div>
      <div className="p-2 border-y border-black w-full flex space-x-1">
        <HeartIcon className="w-4 h-4" />
        <AnnotationIcon className="w-4 h-4" />
      </div>
      <div className="flex flex-col space-y-1"> 
        <span className="">
        Liked by mohammadgh4907
and others
        </span>
        <span>
          dualipa Take a moment to dream.. to a sun-drenched, vibrant, stress-free, Caipirinha filled Rio De Janeiro with happy Cariocas... 
          <button className="text-s text-gray-600">
            more
          </button>
        </span>
        <span className="text-s text-gray-600">
          View all 1,8,932 comments
        </span>
        <span className="text-gray-800 text-sm">
          1 week ago
        </span>
      </div>
    </div>
  );
}
