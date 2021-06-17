import React from 'react'
import Notification from '../NotificationMenu'
import ProfileMenu from '../ProfileMenu'
import ThemeToggle from '../ThemeToggle'

const TopHeader = () => {
    return (
        <div className="flex justify-between items-center">
            <div className="relative flex flex-1 items-center pr-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 absolute left-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input className="placeholder-gray-600 text-gray-900 rounded-md border border-gray-400 py-1 pl-8 focus:outline-none" placeholder="Search" />
            </div>
            <div className="flex justify-between items-center gap-3">
            <ThemeToggle />
                <Notification />
                
                <ProfileMenu />


            </div>
        </div>
    )
}

export default TopHeader