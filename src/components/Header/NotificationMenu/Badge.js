import React from 'react'
import { Menu } from '@headlessui/react'

const Badge = ({ open, projectInvites, setShow, show }) => {

    return (

        <Menu.Button className="focus:outline-none relative" >
            <div className="absolute flex justify-center items-center left-4 -top-1 bg-indigo-700 rounded-full h-3 w-3 p-2">
                <p className="text-xs font-semibold text-gray-100 ">
                    {projectInvites.length}
                </p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg"
                onClick={setShow}
                className="h-7 w-7 text-gray-600" fill="none" viewBox="0 0 24 24"
                stroke={`${show ? "#5219FF" : "currentColor"}`}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        </Menu.Button>
    )
}

export default Badge