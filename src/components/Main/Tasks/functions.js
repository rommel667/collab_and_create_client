export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source.tasks);
    const destClone = Array.from(destination.tasks);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    source = { ...source, tasks: sourceClone }
    destination = { ...destination, tasks: destClone }
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