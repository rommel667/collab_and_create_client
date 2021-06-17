

export const newTaskSubNewData = (project, subscriptionData) => {
    const targetColumn = project.taskColumns.find(col => col._id === subscriptionData.data.newTask.columnId)
    const updatedTasks = [...targetColumn.tasks, subscriptionData.data.newTask]
    const updatedColumn = { ...targetColumn, tasks: [...updatedTasks] }
    return updatedColumn
}