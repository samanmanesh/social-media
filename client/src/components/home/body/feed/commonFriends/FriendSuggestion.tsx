import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Suggestion = ({...props}: Props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // public folder path in env file for routing to work

  return (
    <div className="flex justify-between ">
          <div className="flex">
            <img
              src={`${PF}/people/aben-tefra-UB2S23kSZLM-unsplash.jpg`}
              alt="profile"
              className="w-9 h-9 rounded-full object-cover border border-gray-400"
            />
            <div className="flex flex-col ml-3 text-xs ">
              <span className="font-semibold">kristina</span>
              <span className="text-gray-500">Suggested for you</span>
            </div>
          </div>
          <button className="text-blue-500 text-xs font-semibold">Follow</button>
        </div>
  )
}

export default Suggestion;