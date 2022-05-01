interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ ...props }: Props) {
  return (
    <div className="w-96 h-96 sticky top-28 flex-shrink-0 bg-gray-400">
      <div className="flex space-x-4">
        <img
          src="./assets/people/bailey-burton-1QyI-cct-_A-unsplash.jpg"
          alt="profile"
          className="rounded-full w-14 h-14 object-cover border border-gray-400 ml-7"
        />
        <div className="flex flex-col">
          <span>dualipa</span>
          <span>bio name</span>
        </div>
      </div>
      <div>suggestions list</div>
    </div>
  );
}
