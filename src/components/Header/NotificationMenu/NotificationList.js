import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import NotificationItem from './NotificationItem'


const NotificationList = ({ open, projectInvites, show }) => {

    return (
        projectInvites.length > 0 &&
        <Transition
            show={show}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items
                as="div"
                static
                className="overflow-scroll origin-top-right absolute right-0 mt-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 no-scrollbar .no-scrollbar::-webkit-scrollbar min-h-0 max-h-screen"

            >
           
            {projectInvites?.map(project => {
                    return (
                        <NotificationItem key={project._id} {...project} />
                    )
                })}
           
            <div className="flex items-start justify-center">
            <p className="py-3">---END---</p>
            
            </div>

            </Menu.Items>
        </Transition>
    )
}

export default NotificationList