import React from 'react'
import { Menu } from '@headlessui/react'
import { useSelector } from 'react-redux'


const Badge = ({ open }) => {

    const user = useSelector(state => state.user.user)

    return (
        <div className={`${open ? "border-2 border-indigo-500 rounded-full" : "border-2 border-gray-50 dark:border-gray-800 rounded-full"}`}>
            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                <span className="sr-only">Open user menu</span>
                <img
                    className="h-9 w-9 rounded-full object-cover"
                    src={user.photo}
                    alt=""
                />
            </Menu.Button>
        </div>
    )
}

export default Badge