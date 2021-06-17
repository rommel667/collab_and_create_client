import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from '../SharedComponents/Logo'

const HeaderNoUser = () => {

    const dispatch = useDispatch()
    // const darkMode = useSelector(state => state.theme.darkMode)

    return (
        <header className="dark:bg-gray-700 px-6 py-2 border-b-2 border-gray-200">
            <div className="flex justify-between items-center">

                <Link to="/">
                    <Logo />
                </Link>


                <div className="flex gap-3">
                    <button onClick={() => dispatch({ type: "TOGGLE_MODE", payload: { darkMode: true } })}>ON</button>
                    <button onClick={() => dispatch({ type: "TOGGLE_MODE", payload: { darkMode: false } })}>OFF</button>
                    <Link to="/login">
                        <h3>Login</h3>
                    </Link>
                    <Link to="/register">
                        <h3>Register</h3>
                    </Link>

                </div>
            </div>
        </header>
    )
}

export default HeaderNoUser