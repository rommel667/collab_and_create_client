import React from 'react'
import Project from './Project/index'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@apollo/client'
import { PROJECTS_BY_USER } from '../../../graphql/projects'


const Projects = () => {

    const dispatch = useDispatch()
    const projects = useSelector(state => state.project.projects)

    const { loading, data } = useQuery(
        PROJECTS_BY_USER,
        {
            onCompleted: () => {
                dispatch({ type: "FETCH_PROJECTS", payload: { projects: data.projectsByUser } })
            }
        })



    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? <p>Loading...</p>:
                projects?.map(project => {
                    return (
                        <Project key={project._id} {...project} projects={projects} />
                    )
                })}
            

        </div>
    )
}



export default Projects
