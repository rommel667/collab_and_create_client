import React, { useState } from 'react'
import ModalComponent from '../../SharedComponents/ModalComponent'
import NewProject from '../../Forms/NewProject'
import NewTaskColumn from '../../Forms/NewTaskColumn'
import NewNoteCategory from '../../Forms/NewNoteCategory'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import TopHeader from './TopHeader'
import BottomHeader from './BottomHeader'
import { NEW_PROJECT } from '../../../graphql/projects'
import { NEW_TASK_COLUMN } from '../../../graphql/task'
import { NEW_NOTE_CATEGORY } from '../../../graphql/note'

const HeaderWithUser = ({ user }) => {

    const dispatch = useDispatch()
    const newProjectData = useSelector(state => state.form.newProject)
    const newTaskColumnData = useSelector(state => state.form.newTaskColumn)
    const newNoteCategoryData = useSelector(state => state.form.newNoteCategory)

    const [openNewProjectModal, setOpenNewProjectModal] = useState(false)
    const [openNewTaskColumnModal, setOpenNewTaskColumnModal] = useState(false)
    const [openNewNoteCategoryModal, setOpenNewNoteCategoryModal] = useState(false)
    

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

    const [newNoteCategory] = useMutation(NEW_NOTE_CATEGORY, {
        update(proxy, result) {
            dispatch({ type: "NEW_NOTE_CATEGORY", payload: { newNoteCategory: result.data.newNoteCategory } })
            dispatch({ type: "RESET_INPUTS" })

        },
        variables: { ...newNoteCategoryData }
    })

    const confirmNewProjectHandler = () => {
        newProject()
        setOpenNewProjectModal(false)

    }

    const confirmNewTaskColumnHandler = () => {
        newTaskColumn()
        setOpenNewTaskColumnModal(false)
    }

    const confirmNewNoteCategoryHandler = () => {
        newNoteCategory()
        setOpenNewNoteCategoryModal(false)
    }

    return (
        <header className="px-6 py-1 border-b-2 border-gray-200">
            <TopHeader />
            <BottomHeader
                setOpenNewProjectModal={() => setOpenNewProjectModal(true)}
                setOpenNewTaskColumnModal={() => setOpenNewTaskColumnModal(true)}
                setOpenNewNoteCategoryModal={() => setOpenNewNoteCategoryModal(true)}
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
                <ModalComponent
                    open={openNewNoteCategoryModal}
                    closeModal={() => setOpenNewNoteCategoryModal(false)}
                    confirm={confirmNewNoteCategoryHandler}
                    cancel={() => setOpenNewNoteCategoryModal(false)}
                    modalTitle="New Notes Category"
                >
                    <NewNoteCategory />
                </ModalComponent>
            
        </header>
    )
}

export default HeaderWithUser