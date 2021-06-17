import React from 'react'
import { useHistory } from 'react-router-dom'


const Home = () => {

    const history = useHistory()

    return (
        <div className="dark:bg-gray-700 bg-white min-h-screen flex flex-col lg:flex-row justify-center items-center px-2 md:px-5 lg:px-20 pb-10 gap-5">
            <div className="flex w-full lg:w-3/5">
                <img
                    className="w-full h-full rounded-md"
                    src="https://www.ntaskmanager.com/wp-content/uploads/2019/05/teamwork-quote.png"
                    alt="team"
                />
            </div>
            <div className="flex flex-col items-start space-y-5 md:space-y-8 w-full lg:w-2/5">
                <div className="dark:text-gray-200 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 h-full font-montserrat tracking-wider">
                    Team becomes more effective with the right tool.
                </div>
                <div className="dark:text-gray-300 text-base md:text-lg lg:text-xl font-medium text-gray-600 font-montserrat">
                    Collaborate, manage projects and reach new productivity peaks.
                    From high rises to the home office, the way your team works is
                    unique - accomplish it all with Collab&Create.

                </div>
                <button
                    onClick={() => history.push('/register')}
                    type="button"
                    className="bg-gradient-to-r from-indigo-700 to-indigo-500 hover:from-indigo-800 focus:outline-none hover:to-indigo-600 p-4 rounded-2xl md:w-3/6"
                >
                    <p className="text-gray-300 font-semibold">Create an Account</p>
                </button>
            </div>
            

        </div>
    )
}

export default Home