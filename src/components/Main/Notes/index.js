import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import DroppableComponent from './DroppableComponent'
import { getItemStyle, move, moveNoteNewData, reorder } from './functions'
import NewNote from '../../Forms/NewNote'
import ModalComponent from '../../SharedComponents/ModalComponent'
import { PROJECTS_BY_USER, PROJECT_INFO } from '../../../graphql/projects'
import { MOVE_NOTE, MOVE_NOTE_CATEGORY, NEW_NOTE } from '../../../graphql/note'


const Notes = () => {

    const dispatch = useDispatch()
    const noteCategories = useSelector(state => state.note.noteCategories)
    const newNoteData = useSelector(state => state.form.newNote)
    const projects = useSelector(state => state.project.projects)

    const [openNewNoteModal, setOpenNewNoteModal] = useState(false)
    const [updating, setUpdating] = useState(false)

    const { projectId } = useParams()

    //if user refreshes on this page need to query projects again
    const [fetchProjects, { loading: fetchProjectsLoading, data: fetchProjectsData }] = useLazyQuery(
        PROJECTS_BY_USER,
        {
            onCompleted: () => {
                dispatch({ type: "FETCH_PROJECTS", payload: { projects: fetchProjectsData.projectsByUser } })
            }
        })

    useEffect(() => {
        if(projects === null) {
            fetchProjects()
        }
        dispatch({ type: "UPDATE_PROJECT_ID_FOR_NOTE", payload: { projectId } })
    }, [noteCategories])


    const [moveNote] = useMutation(MOVE_NOTE, {
        update(proxy, result) {
            const { sourceCategoryId, destinationCategoryId, noteId } = result.data.moveNote
            const data = proxy.readQuery({
                query: PROJECT_INFO,
                variables: { projectId },
            });
            if (data) {
                const newData = moveNoteNewData(data, sourceCategoryId, destinationCategoryId, noteId)
                proxy.writeQuery({
                    query: PROJECT_INFO,
                    variables: { projectId },
                    data: { projectInfo: { ...newData } }
                });
                setUpdating(false)
            } else {
                return
            }
            // PENDING DISPATCH SOLUTION IF UPDATE FAILED ON SERVER/DB
        },
        // variables & updateTaskColumns for moved task for the redux state dispatch @ onDragEnd function
    })



    const [moveNoteCategory] = useMutation(MOVE_NOTE_CATEGORY, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: PROJECT_INFO,
                variables: { projectId },
            });
            const updatedNoteCategories = []
            result.data.moveNoteCategory.newSequenceIds.map((seq, index) => {
                data.projectInfo.noteCategories.map(cat => {
                    if (seq === cat._id) {
                        updatedNoteCategories.push({ ...cat, sequence: index + 1 })
                    }
                    return null
                })
                return null
            })
            proxy.writeQuery({
                query: PROJECT_INFO,
                variables: { projectId },
                data: {
                    projectInfo: {
                        ...data.projectInfo,
                        noteCategories: [...updatedNoteCategories]
                    }
                }
            });
            //variables & newColumnOrder for redux state dispatch @ onDragEnd function
        },
    })


    const [newNote] = useMutation(NEW_NOTE, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: PROJECT_INFO,
                variables: { projectId },
            });
            const targetCategory = data.projectInfo.noteCategories.find(cat => cat._id === result.data.newNote.categoryId)
            const updatedNotes = [...targetCategory.notes, result.data.newNote]
            const updatedCategory = { ...targetCategory, tasks: [...updatedNotes] }
            proxy.writeQuery({
                query: PROJECT_INFO,
                variables: { projectId },
                data: {
                    projectInfo: {
                        ...data.projectInfo,
                        noteCategories: [...data.projectInfo.noteCategories.filter(cat => cat._id !== result.data.newNote.categoryId), updatedCategory]
                    }
                }

            });
            dispatch({ type: "NEW_NOTE", payload: { categoryId: newNoteData.categoryId, newNote: result.data.newNote } })
            dispatch({ type: "RESET_INPUTS" })
        },
        variables: { ...newNoteData }
    })


    const { loading, data } = useQuery(
        PROJECT_INFO,
        {
            variables: { projectId },
            onCompleted: () => {
                dispatch({ type: "SELECTED_PROJECT_DATA", payload: { project: data.projectInfo } })
                const tempArray = [...data.projectInfo.noteCategories]
                const sortedNoteCategories = tempArray.sort((a, b) => a.sequence - b.sequence)
                dispatch({ type: "FETCH_NOTE_CATEGORIES", payload: { noteCategories: sortedNoteCategories } })
            }
        })

    const onOpenNewNoteModal = (categoryId) => {
        setOpenNewNoteModal(true)
        dispatch({ type: "NOTE_CATEGORY_ID", payload: { categoryId } })
    }

    const confirmNewNoteHandler = () => {
        newNote()
        setOpenNewNoteModal(false)
    }

    function onDragEnd(result) {
        const { source, destination, draggableId, type } = result;
        // dropped outside the list
        if (!destination || updating) {
            return;
        }

        if (type === "row") {
            const newCategoryOrder = Array.from(noteCategories)
            const target = newCategoryOrder[source.index]
            newCategoryOrder.splice(source.index, 1)
            newCategoryOrder.splice(destination.index, 0, target)
            const noteCategoryIds = newCategoryOrder.map(col => col._id)
            moveNoteCategory({ variables: { noteCategoryIds, projectId } })
            dispatch({ type: "ON_DRAG_END_NOTE_CATEGORY", payload: { newCategoryOrder } })
            return
        }

        const sId = source.droppableId;
        const dId = destination.droppableId;

        const notes = reorder(noteCategories.find(c => c._id === sId).notes, source.index, destination.index);
        const newNoteCategories = [...noteCategories];
        newNoteCategories[newNoteCategories.findIndex(c => c._id === sId)] = { ...newNoteCategories[newNoteCategories.findIndex(c => c._id === sId)], notes }
        dispatch({ type: "ON_DRAG_END_NOTE", payload: { newNoteCategories } })

        if (sId === dId) {
            const notes = reorder(noteCategories.find(c => c._id === sId).notes, source.index, destination.index);
            const newNoteCategories = [...noteCategories];
            newNoteCategories[newNoteCategories.findIndex(c => c._id === sId)] = { ...newNoteCategories[newNoteCategories.findIndex(c => c._id === sId)], notes }
            dispatch({ type: "ON_DRAG_END_NOTE", payload: { newNoteCategories } })
        } else {
            const result = move(noteCategories.find(c => c._id === sId), noteCategories.find(c => c._id === dId), source, destination);
            const newNoteCategories = [...noteCategories];
            newNoteCategories[newNoteCategories.findIndex(c => c._id === sId)] = result[sId];
            newNoteCategories[newNoteCategories.findIndex(c => c._id === dId)] = result[dId];
            dispatch({ type: "ON_DRAG_END_NOTE", payload: { newNoteCategories } })
            setUpdating(true)
            moveNote({ variables: { sourceCategoryId: sId, destinationCategoryId: dId, noteId: draggableId, projectId } })
        }
    }


    return (
        loading ?
            <p>Loading...</p> :

            <main className="p-3 flex flex-1 h-full">

                {noteCategories.length === 0 && <p>No Category Added.</p>}

                <ModalComponent
                    open={openNewNoteModal}
                    closeModal={() => setOpenNewNoteModal(false)}
                    confirm={confirmNewNoteHandler}
                    cancel={() => setOpenNewNoteModal(false)}
                    modalTitle="New Note"
                >
                    <NewNote />
                </ModalComponent>

                <DragDropContext onDragEnd={onDragEnd} className="p-3">

                    <Droppable droppableId={projectId} direction="vertical" type="row" >
                        {(provided, snapshot) => {
                            return (
                                <div
                                    className={`${snapshot.isDraggingOver ? "bg-blue-200" : ""} flex flex-col flex-1 gap-2`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <DroppableComponent
                                        setOpen={onOpenNewNoteModal}
                                        noteCategories={noteCategories}
                                        getItemStyle={getItemStyle}
                                    />
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>

                </DragDropContext>
            </main>

    )
}

export default Notes