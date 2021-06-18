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

export const newNoteSubNewData = (project, subscriptionData) => {
    const targetCategory = project.noteCategories.find(cat => cat._id === subscriptionData.data.newNote.categoryId)
    const updatedNotes = [...targetCategory.notes, subscriptionData.data.newNote]
    const updatedCategory = { ...targetCategory, notes: [...updatedNotes] }
    return updatedCategory
}

export const moveNoteSubNewData = (project, sourceCategoryId, destinationCategoryId, noteId) => {
    const filteredCategories = project.noteCategories.filter(cat => cat._id !== sourceCategoryId && cat._id !== destinationCategoryId)
    const sourceCategory = project.noteCategories.find(cat => cat._id === sourceCategoryId)
    const targetNote = sourceCategory.notes.find(note => note._id === noteId)
    const updatedSourceCategory = { ...sourceCategory, notes: [...sourceCategory.notes.filter(note => note._id !== noteId)] }
    const destinationCategory = project.noteCategories.find(cat => cat._id === destinationCategoryId)
    const updatedDestinationCategory = { ...destinationCategory, notes: [targetNote, ...destinationCategory.notes] }
    const updatedTaskCategories = [
        ...filteredCategories,
        updatedSourceCategory,
        updatedDestinationCategory
    ]
    return updatedTaskCategories
}