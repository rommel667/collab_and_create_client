import React from 'react'
import { useSelector } from 'react-redux'


const BottomLeftLabel = ({ path, projectData }) => {

    const currentProject = useSelector(state => state.project.projectData)

    return (
        <div className="flex flex-col justify-start">

            {path === "tasks" &&
                <div>
                    <div>
                        <h1 className="dark:text-gray-300 text-xl font-semibold text-gray-700 leading-tight">
                            {/* {`${path.charAt(0).toUpperCase() + path.slice(1)} for ${projectData?.projectName}`} */}
                            {currentProject && `Tasks for ${currentProject?.projectName}`}
                        </h1>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                        {projectData?.confirmedMembers.map(member => {
                            return (
                                <img
                                    key={member._id}
                                    className="dark:border-gray-800 h-6 w-6 rounded-full object-cover border-2 border-white -ml-3"
                                    src={member.photo} alt="profile" />
                            )
                        })}
                    </div>
                </div>}

            {path === "projects" &&
                <div className="py-2">
                    <div>
                        <h1 className="dark:text-gray-300 text-2xl font-semibold text-gray-700 leading-tight">
                            {`${path.charAt(0).toUpperCase() + path.slice(1)}`}
                        </h1>
                    </div>
                </div>}

        </div>
    )
}

export default BottomLeftLabel