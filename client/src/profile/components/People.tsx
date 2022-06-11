import { UserSuggestion } from 'api';
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  closeModal: () => void;
  user: UserSuggestion;
}

const People = ({closeModal, user}: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work
  return (
    <div className="flex justify-between ">
                    <Link
                      to={`/profile/${user.username}`}
                      className="flex space-x-3 m-2 "
                      onClick={closeModal}
                    >
                      <img
                        className="rounded-full w-8 h-8 object-cover "
                        src={
                          user.profilePicture
                            ? user.profilePicture
                            : PF + "people/no-image-avatar2.png"
                        }
                        alt={user.username}
                      />
                      <div className="text-xs  font-semibold self-center">
                        {user.username}
                      </div>
                    </Link>
                    <button className="border rounded mx-4 my-2 p-1">
                      Following
                    </button>
                  </div>

  )
}

export default People