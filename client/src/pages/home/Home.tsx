
import Header from "../../components/header/Header";
import Feed from '../../components/body/feed/Feed';

export default function Home() {
  return (
    <div className="bg-neutral-100">
      <Header />
      <Feed/>
    </div>
  );
}
