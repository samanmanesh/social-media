interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ ...props }: Props) {
  return (
    <div className="w-96 h-96 sticky top-20 flex-shrink-0 bg-gray-400 p-6">
      <div className="flex space-x-4">
        <img
          src="./assets/people/bailey-burton-1QyI-cct-_A-unsplash.jpg"
          alt="profile"
          className="rounded-full w-14 h-14 object-cover border border-gray-400 "
        />
        <div className="flex flex-col mt-2 text-sm">
          <span className="font-semibold">dualipa</span>
          <span className="text-gray-800">Dua 💋</span>
        </div>
      </div>
      <div className="">suggestions list</div>
    </div>
  );
}
