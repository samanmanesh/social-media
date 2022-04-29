import { HeartIcon } from '@heroicons/react/outline';

export default function Navbar() {
  return <div class="flex">
    <div class="rounded-full border-2 w-10 h-10" ></div>
    <div class="">
      <HeartIcon class="w-6 h-6" />
    </div>
    <div>Requests</div>
    <div>Messages</div>
    <div>add post</div>
  </div>;
}
