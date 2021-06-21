import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center bg-gradient-to-r from-indigo-800 to-indigo-400 text-gradient">
      <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-600 fill-current h-12 w-10" stroke="none">
        <text x="0" y="40" className="text-5xl font-bold">C</text>
        <text x="11" y="32" className="text-2xl font-semibold">C</text>
      </svg>
      <h3 className="text-indigo-600 text-xl font-bold">Collab&Create</h3>

    </div>

  )
}

export default Logo