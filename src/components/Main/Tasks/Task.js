import React from 'react'

const Task = ({ description, photo, createdAt, isDragging }) => {
  return (
    <li className={`${isDragging ? "bg-green-300" : "bg-white"} rounded-md shadow p-2`}>
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium">{description}</p>
        </div>
        <img
          className="h-7 w-7 rounded-full object-cover border-2 border-white -ml-3"
          src={photo} alt="profile" />
      </div>
      <div className="flex justify-between items-center mt-5">
        <p className="text-sm text-gray-500 font-medium">{createdAt}</p>
      </div>

    </li>
  )
}

export default Task