import React from 'react'

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-tansparent bg-opacity-70 gap-4">
    <div className="w-16 h-16 border-4 border-red-400 border-solid border-t-transparent rounded-full animate-spin duration-100">
    <div className="w-14 h-14 border-4 border-green-400 border-solid border-t-transparent rounded-full animate-spin duration-100"
    >
    <div className="w-12 h-12 border-4 border-blue-400 border-solid border-t-transparent rounded-full animate-spin duration-100"></div>
    </div>
    </div>
  </div>
  )
}
