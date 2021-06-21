import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const Menu = ({ menu }) => {

    const location = useLocation()
    const projects = useSelector(state => state.project.projects)
    
    return (
        <Link
            to={`${menu.path}`}
            className={`cursor-pointer flex justify-between items-center 
             rounded-lg px-3 py-2 text-sm font-medium 
            ${location.pathname === menu.path ? "text-gray-900 bg-gray-300" : "text-gray-500 bg-gray-200"}`}
        >
            {menu.text}

            <span className={`${location.pathname === menu.path ? "text-gray-900" : "text-gray-500"} text-xs font-semibold`}>
            {projects?.filter(project => project.status === menu.text).length}
            </span>
        </Link>
    )
}

export default Menu