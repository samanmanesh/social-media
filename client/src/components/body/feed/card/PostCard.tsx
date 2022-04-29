interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function PostCard({ ...props }: Props) {
  return (
    <div {...props} className="max-w-xl h-96  border border-gray-500">
      PostCard
    </div>
  );
}
