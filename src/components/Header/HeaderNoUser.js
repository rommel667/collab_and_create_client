import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../SharedComponents/Logo'
import ThemeToggle from './ThemeToggle'

const HeaderNoUser = () => {

    return (
        <header className="dark:bg-gray-800 px-6 py-2 border-b-2 border-gray-200">
            <div className="flex justify-between items-center">

                <Link to="/">
                    <Logo />
                </Link>

                <div className="flex gap-3 items-center">
                    <ThemeToggle />
                    <Link to="/login">
                        <h3 className="dark:text-gray-300 text-sm font-medium text-gray-700 hover:text-indigo-600">Login</h3>
                    </Link>
                    <Link to="/register">
                        <button
                            className="group relative w-full flex justify-center py-1 px-2 border border-transparent text-sm font-medium rounded-md text-gray-300 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
                        </button>
                    </Link>

                </div>
            </div>
        </header>
    )
}

export default HeaderNoUser