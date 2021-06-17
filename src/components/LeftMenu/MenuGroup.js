import React from 'react'
import Menu from './Menu'

const MenuGroup = ({ menuGroupText, menus }) => {
    return (
        <div className="mt-6">

            <div className="flex justify-between items-center">
                <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{menuGroupText}</h2>
            </div>

            <div className="mt-2 -mx-3 space-y-1">
                {menus.map((menu, index) => {
                    return (
                        <Menu
                            key={index}
                            menu={menu}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default MenuGroup