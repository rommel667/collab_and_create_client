export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source.notes);
    const destClone = Array.from(destination.notes);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    source = { ...source, notes: sourceClone }
    destination = { ...destination, notes: destClone }
    const result = {};
    result[droppableSource.droppableId] = source;
    result[droppableDestination.droppableId] = destination;
    return result;
};

const grid = 8;

export const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
    // styles we need to apply on draggables
    ...draggableStyle
});


export const moveNoteNewData = (data, sourceCategoryId, destinationCategoryId, noteId) => {
    const filteredCategories = data.projectInfo.noteCategories.filter(cat => cat._id !== sourceCategoryId && cat._id !== destinationCategoryId)
    const sourceCategory = data.projectInfo.noteCategories.find(cat => cat._id === sourceCategoryId)
    const targetNote = sourceCategory.notes.find(note => note._id === noteId)
    const updatedSourceCategory = { ...sourceCategory, notes: [...sourceCategory.notes.filter(note => note._id !== noteId)] }
    const destinationCategory = data.projectInfo.noteCategories.find(cat => cat._id === destinationCategoryId)
    const updatedDestinationCategory = { ...destinationCategory, notes: [targetNote, ...destinationCategory.notes] }
    const updatedNoteCategories = [
        ...filteredCategories,
        updatedSourceCategory,
        updatedDestinationCategory
    ]
    const newData = {
        ...data.projectInfo, noteCategories: [...updatedNoteCategories]
    }
    return newData
}