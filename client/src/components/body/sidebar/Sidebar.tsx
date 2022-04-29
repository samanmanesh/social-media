interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ ...props }: Props) {
  return (
    <div className="w-96 h-96  sticky top-28 flex-shrink-0 bg-gray-400">
      sidebar
    </div>
  );
}
