import React from 'react'

const Icon1 = ({ padding, iconSize }) => {
    return (
        <div className={`py-${padding} px-${padding} text-white flex items-center rounded-full py-4 px-4 shadow-xl bg-pink-500`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-${iconSize} w-${iconSize}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        </div>
    )
}

const Icon2 = ({ padding, iconSize }) => {
    return (
        <div className={`py-${padding} px-${padding} text-white flex items-center rounded-full py-4 px-4 shadow-xl bg-green-500`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-${iconSize} w-${iconSize}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        </div>
    )
}

const Icon3 = ({ padding, iconSize }) => {
    return (
        <div className={`py-${padding} px-${padding} text-white flex items-center rounded-full py-4 px-4 shadow-xl bg-blue-500`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-${iconSize} w-${iconSize}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        </div>
    )
}

const Icon4 = ({ padding, iconSize }) => {
    return (
        <div className={`py-${padding} px-${padding} text-white flex items-center rounded-full py-4 px-4 shadow-xl bg-yellow-500`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-${iconSize} w-${iconSize}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
        </div>
    )
}

const icons = [
    { iconName: "icon1", component: Icon1  },
    { iconName: "icon2", component: Icon2  },
    { iconName: "icon3", component: Icon3  },
    { iconName: "icon4", component: Icon4 },
]

export default icons

