import React, { useState } from 'react'
import ModalComponent from '../../SharedComponents/ModalComponent'
import NewProject from '../../Forms/NewProject'
import NewTaskColumn from '../../Forms/NewTaskColumn'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import TopHeader from './TopHeader'
import BottomHeader from './BottomHeader'
import { NEW_PROJECT } from '../../../graphql/projects'
import { NEW_TASK_COLUMN } from '../../../graphql/task'

const HeaderWithUser = ({ user }) => {

    const dispatch = useDispatch()
    const newProjectData = useSelector(state => state.form.newProject)
    const newTaskColumnData = useSelector(state => state.form.newTaskColumn)

    const [openNewProjectModal, setOpenNewProjectModal] = useState(false)
    const [openNewTaskColumnModal, setOpenNewTaskColumnModal] = useState(false)

    

    const [newProject] = useMutation(NEW_PROJECT, {
        update(proxy, result) {
            dispatch({ type: "NEW_PROJECT", payload: { newProject: result.data.newProject } })
            dispatch({ type: "RESET_INPUTS" })
        },
        variables: {
            ...newProjectData,
            unconfirmMembers: newProjectData.unconfirmMembers.map(member => member.value),
            techStacks: newProjectData.techStacks.map(stack => stack.value),
        }
    })

    const [newTaskColumn] = useMutation(NEW_TASK_COLUMN, {
        update(proxy, result) {
            dispatch({ type: "NEW_TASK_COLUMN", payload: { newTaskColumn: result.data.newTaskColumn } })
            dispatch({ type: "RESET_INPUTS" })

        },
        variables: { ...newTaskColumnData }
    })

    const confirmNewProjectHandler = () => {
        newProject()
        setOpenNewProjectModal(false)

    }

    const confirmNewTaskColumnHandler = () => {
        newTaskColumn()
        setOpenNewTaskColumnModal(false)
    }

    return (
        <header className="px-6 py-1 border-b-2 border-gray-200">
            <TopHeader />
            <BottomHeader
                setOpenNewProjectModal={() => setOpenNewProjectModal(true)}
                setOpenNewTaskColumnModal={() => setOpenNewTaskColumnModal(true)}
            />
            
            <ModalComponent
                    open={openNewProjectModal}
                    closeModal={() => setOpenNewProjectModal(false)}
                    confirm={confirmNewProjectHandler}
                    cancel={() => setOpenNewProjectModal(false)}
                    modalTitle="New Project"
                >
                    <NewProject />
                </ModalComponent>
                <ModalComponent
                    open={openNewTaskColumnModal}
                    closeModal={() => setOpenNewTaskColumnModal(false)}
                    confirm={confirmNewTaskColumnHandler}
                    cancel={() => setOpenNewTaskColumnModal(false)}
                    modalTitle="New Task Column"
                >
                    <NewTaskColumn />
                </ModalComponent>
            
        </header>
    )
}

export default HeaderWithUser