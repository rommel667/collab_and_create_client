import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillBrightnessHighFill, BsMoon } from "react-icons/bs";

const ThemeToggle = () => {

    const dispatch = useDispatch()
    const darkMode = useSelector(state => state.theme.darkMode)

    const darkOn = () => {
        dispatch({ type: "TOGGLE_MODE", payload: { darkMode: false } })
        localStorage.setItem("theme", false)
    }

    const darkOff = () => {
        dispatch({ type: "TOGGLE_MODE", payload: { darkMode: true } })
        localStorage.setItem("theme", true)
    }

    return (
        <div className="text-gray-300 cursor-pointer">
            {darkMode ?
                <BsFillBrightnessHighFill
                    className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    onClick={darkOn}
                /> :
                <BsMoon
                    className="text-gray-700 w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    onClick={darkOff}
                />}
        </div>
    )
}

export default ThemeToggle