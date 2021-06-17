import React from 'react'

const AuthHeader = ({ headerText }) => {
    return (
        <div>
{/*        
          <svg xmlns="http://www.w3.org/2000/svg" className="text-indigo-600 fill-current h-12 w-12" stroke="none">
            <text x="0" y="40" className="text-5xl font-bold">C</text>
            <text x="11" y="32" className="text-2xl font-semibold">C</text>
          </svg> */}

        <h2 className="mt-6 text-center text-3xl font-semibold dark:text-gray-300 text-gray-700">{headerText}</h2>
      </div>
    )
}

export default AuthHeader