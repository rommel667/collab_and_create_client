import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MOVE_TASK, NEW_TASK, MOVE_TASK_COLUMN } from '../../../graphql/task'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import DroppableComponent from './DroppableComponent'
import { getItemStyle, move, reorder } from './functions'
import NewTask from '../../Forms/NewTask'
import ModalComponent from '../../SharedComponents/ModalComponent'
import { PROJECTS_BY_USER, PROJECT_TASKS } from '../../../graphql/projects'



const Tasks = () => {

    const dispatch = useDispatch()
    const taskColumns = useSelector(state => state.task.taskColumns)
    const newTaskData = useSelector(state => state.form.newTask)
    const projects = useSelector(state => state.project.projects)

    const [openNewTaskModal, setOpenNewTaskModal] = useState(false)
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
        console.log("WHY", projects);
        if(projects === null) {
            fetchProjects()
        }
        dispatch({ type: "UPDATE_PROJECT_ID", payload: { projectId } })
        
    }, [])


    const [moveTask] = useMutation(MOVE_TASK, {
        update(proxy, result) {
            const { sourceColumnId, destinationColumnId, taskId } = result.data.moveTask
          
            const data = proxy.readQuery({
                query: PROJECT_TASKS,
                variables: { projectId },
            });
            if (data) {
                const filteredColumns = data.projectInfo.taskColumns.filter(col => col._id !== sourceColumnId && col._id !== destinationColumnId)
                const sourceColumn = data.projectInfo.taskColumns.find(col => col._id === sourceColumnId)
                const targetTask = sourceColumn.tasks.find(task => task._id === taskId)
                const updatedSourceColumn = { ...sourceColumn, tasks: [...sourceColumn.tasks.filter(task => task._id !== taskId)] }
                const destinationColumn = data.projectInfo.taskColumns.find(col => col._id === destinationColumnId)
                const updatedDestinationColumn = { ...destinationColumn, tasks: [targetTask, ...destinationColumn.tasks] }
                const updatedTaskColumns = [
                    ...filteredColumns,
                    updatedSourceColumn,
                    updatedDestinationColumn
                ]
                const newData = {
                    ...data.projectInfo, taskColumns: [...updatedTaskColumns]
                }
                proxy.writeQuery({
                    query: PROJECT_TASKS,
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



    const [moveTaskColumn] = useMutation(MOVE_TASK_COLUMN, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: PROJECT_TASKS,
                variables: { projectId },
            });
            const updatedTaskColumns = []
            result.data.moveTaskColumn.newSequenceIds.map((seq, index) => {
                data.projectInfo.taskColumns.map(col => {
                    if (seq === col._id) {
                        updatedTaskColumns.push({ ...col, sequence: index + 1 })
                    }
                    return null
                })
                return null
            })
            proxy.writeQuery({
                query: PROJECT_TASKS,
                variables: { projectId },
                data: {
                    projectInfo: {
                        ...data.projectInfo,
                        taskColumns: [...updatedTaskColumns]
                    }
                }
            });
            //variables & newColumnOrder for redux state dispatch @ onDragEnd function
        },
    })


    const [newTask] = useMutation(NEW_TASK, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: PROJECT_TASKS,
                variables: { projectId },
            });
            const targetColumn = data.projectInfo.taskColumns.find(col => col._id === result.data.newTask.columnId)
            const updatedTasks = [...targetColumn.tasks, result.data.newTask]
            const updatedColumn = { ...targetColumn, tasks: [...updatedTasks] }
            proxy.writeQuery({
                query: PROJECT_TASKS,
                variables: { projectId },
                data: {
                    projectInfo: {
                        ...data.projectInfo,
                        taskColumns: [...data.projectInfo.taskColumns.filter(col => col._id !== result.data.newTask.columnId), updatedColumn]
                    }
                }

            });
            dispatch({ type: "NEW_TASK", payload: { columnId: newTaskData.columnId, newTask: result.data.newTask } })
            dispatch({ type: "RESET_INPUTS" })
        },
        variables: { ...newTaskData }
    })


    const { loading, data } = useQuery(
        PROJECT_TASKS,
        {
            variables: { projectId },
            onCompleted: () => {
                dispatch({ type: "SELECTED_PROJECT_DATA", payload: { project: data.projectInfo } })
                const tempArray = [...data.projectInfo.taskColumns]
                const sortedTaskColumns = tempArray.sort((a, b) => a.sequence - b.sequence)
                dispatch({ type: "FETCH_TASK_COLUMNS", payload: { taskColumns: sortedTaskColumns } })
            }
        })

    const onOpenNewTaskModal = (columnId) => {
        setOpenNewTaskModal(true)
        dispatch({ type: "TASK_COLUMN_ID", payload: { columnId } })
    }

    const confirmNewTaskHandler = () => {
        newTask()
        setOpenNewTaskModal(false)
    }

    function onDragEnd(result) {
        const { source, destination, draggableId, type } = result;
        // dropped outside the list
        if (!destination || updating) {
            return;
        }

        if (type === "column") {
            const newColumnOrder = Array.from(taskColumns)
            const target = newColumnOrder[source.index]
            newColumnOrder.splice(source.index, 1)
            newColumnOrder.splice(destination.index, 0, target)
            const taskColumnIds = newColumnOrder.map(col => col._id)
            moveTaskColumn({ variables: { taskColumnIds, projectId } })
            dispatch({ type: "ON_DRAG_END_COLUMN", payload: { newColumnOrder } })
            return
        }

        const sId = source.droppableId;
        const dId = destination.droppableId;

        if (sId === dId) {
            const tasks = reorder(taskColumns.find(c => c._id === sId).tasks, source.index, destination.index);
            const newTaskColumns = [...taskColumns];
            newTaskColumns[newTaskColumns.findIndex(c => c._id === sId)] = { ...newTaskColumns[newTaskColumns.findIndex(c => c._id === sId)], tasks }
            dispatch({ type: "ON_DRAG_END_TASK", payload: { newTaskColumns } })
        } else {
            const result = move(taskColumns.find(c => c._id === sId), taskColumns.find(c => c._id === dId), source, destination);
            const newTaskColumns = [...taskColumns];
            newTaskColumns[newTaskColumns.findIndex(c => c._id === sId)] = result[sId];
            newTaskColumns[newTaskColumns.findIndex(c => c._id === dId)] = result[dId];
            dispatch({ type: "ON_DRAG_END_TASK", payload: { newTaskColumns } })
            setUpdating(true)
            moveTask({ variables: { sourceColumnId: sId, destinationColumnId: dId, taskId: draggableId, projectId } })
            //   setTasks(newTasks.filter(group => group.length));
        }
    }


    return (
        loading ?
            <p>Loading...</p> :

            <main className="p-3 flex flex-1 h-full">

                {taskColumns.length === 0 && <p>No Column Added. Create minimum of two columns with last column for finished tasks to track your progress.</p>}

                <ModalComponent
                    open={openNewTaskModal}
                    closeModal={() => setOpenNewTaskModal(false)}
                    confirm={confirmNewTaskHandler}
                    cancel={() => setOpenNewTaskModal(false)}
                    modalTitle="New Task"
                >
                    <NewTask />
                </ModalComponent>

                <DragDropContext onDragEnd={onDragEnd} className="p-3">

                    <Droppable droppableId={projectId} direction="horizontal" type="column" >
                        {(provided, snapshot) => {
                            return (
                                <div
                                    className={`${snapshot.isDraggingOver ? "bg-blue-200" : ""} flex flex-row flex-1 gap-2`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <DroppableComponent
                                        setOpen={onOpenNewTaskModal}
                                        taskColumns={taskColumns}
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

export default Tasks