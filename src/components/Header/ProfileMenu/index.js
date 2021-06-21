import React from 'react'
import { Menu } from '@headlessui/react'
import Badge from './Badge'
import MenuItems from './MenuItems'

const ProfileMenu = () => {
    return (
        <Menu as="div" className="ml-3 relative">
            {({ open }) => (
                <>
                    <Badge open={open} />
                    <MenuItems open={open}  />
                </>
            )}
        </Menu>
    )
}

export default ProfileMenu