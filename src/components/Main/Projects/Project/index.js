import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import projectIcons from '../../../Icons/ProjectIcons'
import Members from './Members'
import Progress from './Progress'


const Project = ({ projects, _id, projectName, description, icon, confirmedMembers, taskColumns, techStacks, status, createdBy, createdAt, updatedAt }) => {

    const dispatch = useDispatch()
    const selectedProject = useSelector(state => state.project.projectData)

    const [progress, setProgress] = useState(null)
    const [displayMembers, setDisplayMembers] = useState([])

    const getProjectData = () => {
        dispatch({ type: "SELECTED_PROJECT_DATA", payload: { project: projects.find(project => project._id === _id) } })
    }

    const createdAtDate = new Date(createdAt).toLocaleString()
    const updatedAtDate = new Date(updatedAt).toLocaleString()

    useEffect(() => {
        console.log("RE RENDER");
        const taskColumnsClone = [...taskColumns]
        const sortedTaskColumns = taskColumnsClone.sort((a, b) => a.sequence - b.sequence)
        if (sortedTaskColumns.length >= 2) {
            let totalTask = 0
            sortedTaskColumns.map(col => {
                totalTask = totalTask + col.tasks.length
                return null
            })
            setProgress(((sortedTaskColumns[sortedTaskColumns.length - 1].tasks.length / totalTask) * 100).toFixed(0))
        }
        if (confirmedMembers.length > 5) {
            setDisplayMembers(confirmedMembers.filter((m, i) => i <= 4))
        } else {
            setDisplayMembers(confirmedMembers)
        }
    }, [projects, selectedProject])



    return (
        <div className="relative bg-white py-6 px-6 rounded-3xl w-64 my-6 shadow-md">
            <Link className="absolute left-4 -top-6" to={`/tasks/${_id}`} onClick={getProjectData}>
                {projectIcons.find(i => i.iconName === icon).component({ padding: 1, iconSize: 4 })}
            </Link>

            <div className="mt-2">
                <p className="text-xl font-semibold my-2">{projectName}</p>
                <div className="flex flex-col text-gray-400 text-xs mb-2">
                    {/* <p>Created: {createdAt.split("T")[0]}</p> */}
                    <p>{createdAtDate}</p>
                    <p>{updatedAtDate}</p>
                    {/* <p>Updated: {updatedAt.toISOString().split("T")[0]}</p> */}
                    {/* <p>Updated: {updatedAt.split("T")[0]}</p> */}
                </div>
                <div className="border-t-2 "></div>

                <div className="flex justify-between">
                    <Members displayMembers={displayMembers} />
                    {progress && <Progress progress={progress} />}
                </div>
            </div>
        </div>
    )
}


export default Project
