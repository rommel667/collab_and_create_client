import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Theme = ({ children }) => {

    const dispatch = useDispatch()
    const darkMode = useSelector(state => state.theme.darkMode)

    useEffect(() => {
        console.log(localStorage);
        if(localStorage.theme) {
            console.log("WHY", localStorage.theme);
            dispatch({ type: "TOGGLE_MODE", payload: { darkMode: localStorage.theme } })
        } else {
            dispatch({ type: "TOGGLE_MODE", payload: { darkMode: false } })
            localStorage.removeItem("theme")
        }
    }, [])


    return (
        <div className={darkMode && "dark"}>
            {children}
        </div>
    )
}


export default Theme