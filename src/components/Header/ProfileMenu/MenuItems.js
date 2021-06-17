import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const MenuItems = ({ open }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const logOutHandler = () => {
        dispatch({ type: "LOGOUT" })
        history.replace('/')
    }

    return (

        <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            >
                <Menu.Item>
                    {({ active }) => (
                        <p
                            className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                            )}
                        >
                            Your Profile
                        </p>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <p
                            className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                            )}
                        >
                            Settings
                        </p>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <p
                            onClick={logOutHandler}
                            className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                            )}
                        >
                            Sign out
                        </p>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Transition>
    )
}

export default MenuItems