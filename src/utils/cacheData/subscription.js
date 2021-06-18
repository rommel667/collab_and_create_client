export const newTaskSubNewData = (project, subscriptionData) => {
    const targetColumn = project.taskColumns.find(col => col._id === subscriptionData.data.newTask.columnId)
    const updatedTasks = [...targetColumn.tasks, subscriptionData.data.newTask]
    const updatedColumn = { ...targetColumn, tasks: [...updatedTasks] }
    return updatedColumn
}

export const moveTaskSubNewData = (project, sourceColumnId, destinationColumnId, taskId) => {
    const filteredColumns = project.taskColumns.filter(col => col._id !== sourceColumnId && col._id !== destinationColumnId)
    const sourceColumn = project.taskColumns.find(col => col._id === sourceColumnId)
    const targetTask = sourceColumn.tasks.find(task => task._id === taskId)
    const updatedSourceColumn = { ...sourceColumn, tasks: [...sourceColumn.tasks.filter(task => task._id !== taskId)] }
    const destinationColumn = project.taskColumns.find(col => col._id === destinationColumnId)
    const updatedDestinationColumn = { ...destinationColumn, tasks: [targetTask, ...destinationColumn.tasks] }
    const updatedTaskColumns = [
        ...filteredColumns,
        updatedSourceColumn,
        updatedDestinationColumn
    ]
    return updatedTaskColumns
}