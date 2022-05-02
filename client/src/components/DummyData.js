


export const Users = () => ([{
  id: '1',
  userName: 'abendoe',
  email: 'abenoe@gmail.com',
  password: '123456',
  profilePicture: './assets/people/aben-tefra-UB2S23kSZLM-unsplash.jpg',
  followers : [],
  followings : [],
  isAdmin: false,
  desc: 'Hi I am Aben Doe',
  city: 'Cairo',
  from: 'Egypt',
  relationship: 1,
},{
  id: '2',
  userName: 'anamnesis',
  email: 'anamnesis@gmail.com',
  password: '123456',
  profilePicture: './assets/people/anamnesis33-gd9U_Or8krg-unsplash.jpg',
  followers : [],
  followings : [],
  isAdmin: false,
  desc: 'Hi I am Anamnesis',
  city: 'Kiev',
  from: 'Ukraine',
  relationship: 2,
},{
  id: '3',
  userName: 'baileyburton',
  email: 'baileyburton@gmail.com',
  password: '123456',
  profilePicture: './assets/people/bailey-burton-1QyI-cct-_A-unsplash.jpg',
  followers : [],
  followings : [],
  isAdmin: false,
  desc: 'Hi I am Bailey Burton',
  city: 'London',
  from: 'England',
  relationship: 3,
}]);

export const Posts = () => ([{
  id: '1',
  userId: '2',
  desc : 'This post is for anamnesis',
  img: './assets/post/img1.jpg',
  likes: ['1', '2', '3'],},{
  id: '2',
  userId: '1',
  desc : 'This post is for aben',
  img: './assets/post/img2.jpg',
  likes: ['1', '2', '3','4']},{
  id: '3',
  userId: '3',
  desc : 'This post is for bailey',
  img: './assets/post/img3.jpg',
  likes: ['1', '2', '3','4','5'],
}]);

