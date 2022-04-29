import React from 'react'
import { SearchIcon } from "@heroicons/react/outline";
type Props = {}

export default function Search({}: Props) {
  return (
    <div className="relative flex items-center">
    <SearchIcon className="w-4 h-4 absolute left-2" />
    <input
      type="text"
      placeholder="Search"
      className="min-w-fit p-1 pl-7 h-7 border rounded border-black w-80 focus:outline-none focus:ring focus:border-blue-500"
    />
  </div>
  )
}