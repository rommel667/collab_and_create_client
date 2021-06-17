import React from 'react'
import HeaderNoUser from './HeaderNoUser'
import HeaderWithUser from './HeaderWithUser'

const Header = ({ user }) => {
    return (
        user ? <HeaderWithUser /> : <HeaderNoUser />
    )
}

export default Header