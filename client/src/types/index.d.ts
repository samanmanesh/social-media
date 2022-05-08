interface Post {
  _id: string;
  userId: string;
  desc: string;
  img: string;
  likes: string[];
  createdAt: Date;
  updateAt: Date;
}

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  coverPicture: string;
  followers: string[];
  following: string[];
  isAdmin: boolean;
  city: string;
  country: string;
  from: string;
  relationship: Number;
  desc: string;
  createdAt: Date;
  updateAt: Date;
}
