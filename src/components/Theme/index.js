import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Theme = ({ children }) => {

    const dispatch = useDispatch()
    const darkMode = useSelector(state => state.theme.darkMode)

    useEffect(() => {
        if(localStorage.getItem('theme')) {
            dispatch({ type: "TOGGLE_MODE", payload: { darkMode: localStorage.getItem('theme') } })
        } else {
            dispatch({ type: "TOGGLE_MODE", payload: { darkMode: false } })
            localStorage.setItem("theme", false)
        }
    }, [])


    return (
        <div className={darkMode ? "dark" : ""}>
            {children}
        </div>
    )
}


export default Theme