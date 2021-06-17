const initialState = {
    taskColumns: []
}


const task = (state = initialState, action) => {
   
    switch(action.type) {
        case "FETCH_TASK_COLUMNS": {
            return {
                ...state,
                taskColumns: action.payload.taskColumns
            }
        }
        case "NEW_TASK_COLUMN": {
            return {
                ...state,
                taskColumns: [ ...state.taskColumns, action.payload.newTaskColumn ]
            }
        }
        case "NEW_TASK": {
            const newTaskColumns = [ ...state.taskColumns ]
            let targetColumn = state.taskColumns.find(taskColumn =>  taskColumn._id === action.payload.columnId)
            targetColumn =  { ...targetColumn, tasks: [ ...targetColumn.tasks, action.payload.newTask ] }
            newTaskColumns[state.taskColumns.findIndex(taskColumn =>  taskColumn._id === action.payload.columnId)] = targetColumn
            return {
                ...state,
                taskColumns: newTaskColumns
            }
        }
        case "NEW_TASK_SUBSCRIPTION": {
            const newTaskColumns = [ ...state.taskColumns ]
            let targetColumn = state.taskColumns.find(taskColumn =>  taskColumn._id === action.payload.newTask.columnId)
            targetColumn =  { ...targetColumn, tasks: [ action.payload.newTask, ...targetColumn.tasks ] }
            newTaskColumns[state.taskColumns.findIndex(taskColumn =>  taskColumn._id === action.payload.newTask.columnId)] = targetColumn
            return {
                ...state,
                taskColumns: newTaskColumns
            }
        }
        case "ON_DRAG_END_COLUMN": {
            return {
                ...state,
                taskColumns: action.payload.newColumnOrder
            }
        }
        case "ON_DRAG_END_TASK": {
            return {
                ...state,
                taskColumns: action.payload.newTaskColumns
            }
        }
        case "MOVE_TASK_SUBSCRIPTION": {
            const tempTaskColumns = [ ...state.taskColumns ]
            const sourceIndex = tempTaskColumns.findIndex(c => c._id === action.payload.moveTask.sourceColumnId)
            const destinationIndex = tempTaskColumns.findIndex(c => c._id === action.payload.moveTask.destinationColumnId)
            const task = tempTaskColumns[sourceIndex].tasks.find(t => t._id === action.payload.moveTask.taskId)
            tempTaskColumns[sourceIndex] = {
                ...tempTaskColumns[sourceIndex],
                tasks: tempTaskColumns[sourceIndex].tasks.filter(t => t._id !== action.payload.moveTask.taskId)
            }
            tempTaskColumns[destinationIndex] = {
                ...tempTaskColumns[destinationIndex],
                tasks: [ task, ...tempTaskColumns[destinationIndex].tasks ]
            }
            return {
                ...state,
                taskColumns: tempTaskColumns
            }
        }
        case "MOVE_TASK_COLUMN_SUBSCRIPTION": {
            const newArray = []
            action.payload.newSequence.map((seq, index) => {
                console.log(seq);
                    state.taskColumns.map(col => {
                        console.log(col);
                        if(seq === col._id) {
                            newArray.push({ ...col, sequence: index + 1 })
                        }
                        return null
                    })
                    return null
            })
            return {
                ...state,
                taskColumns: newArray
            }
        }
        default: {
            return state;
        }
    }
}

export default task