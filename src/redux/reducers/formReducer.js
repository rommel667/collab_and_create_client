const initialState = {
    newProject: {
        projectName: "",
        description: "",
        icon: "",
        unconfirmMembers: [],
        techStacks: [],
    },
    newTaskColumn: {
        columnName: "",
        projectId: ""
    },
    newTask: {
        description: "",
        inCharge: [],
        columnId: "",
        projectId: ""
    },
    newNoteCategory: {
        categoryName: "",
        projectId: ""
    },
    newNote: {
        description: "",
        categoryId: "",
        projectId: ""
    },
}


const form = (state = initialState, action) => {
   
    switch (action.type) {
        // FOR PROJECTS
        case "UPDATE_PROJECT_INPUT": {
            return {
                ...state,
                newProject: {
                    ...state.newProject,
                    [action.payload.name]: action.payload.value
                }
            }
        }
        case "SELECT_MEMBERS": {
            return {
                ...state,
                newProject: {
                    ...state.newProject,
                    unconfirmMembers: action.payload.items
                }
            }
        }
        case "SELECT_TECH_STACKS": {
            return {
                ...state,
                newProject: {
                    ...state.newProject,
                    techStacks: action.payload.items
                }
            }
        }
        case "SELECT_ICON": {
            return {
                ...state,
                newProject: {
                    ...state.newProject,
                    icon: action.payload.icon
                }
            }
        }

        //FOR TASK COLUMN
        case "UPDATE_TASK_COLUMN_INPUT": {
            return {
                ...state,
                newTaskColumn: {
                    ...state.newTaskColumn,
                    [action.payload.name]: action.payload.value
                }
            }
        }
        case "UPDATE_PROJECT_ID_FOR_TASK": {
            return {
                ...state,
                newTaskColumn: {
                    ...state.newTaskColumn,
                    projectId: action.payload.projectId
                },
                newTask: {
                    ...state.newTask,
                    projectId: action.payload.projectId
                }
            }
        }

        //FOR TASKS
        case "UPDATE_TASK_INPUT": {
            return {
                ...state,
                newTask: {
                    ...state.newTask,
                    [action.payload.name]: action.payload.value
                }
            }
        }
        case "SELECT_IN_CHARGE": {
            return {
                ...state,
                newTask: {
                    ...state.newTask,
                    inCharge: action.payload.items.map(item => item.value)
                }
            }
        }
        case "TASK_COLUMN_ID": {
            return {
                ...state,
                newTask: {
                    ...state.newTask,
                    columnId: action.payload.columnId
                }
            }
        }


        //FOR NOTE CATEGORY
        case "UPDATE_NOTE_CATEGORY_INPUT": {
            return {
                ...state,
                newNoteCategory: {
                    ...state.newNoteCategory,
                    [action.payload.name]: action.payload.value
                }
            }
        }
        case "UPDATE_PROJECT_ID_FOR_NOTE": {
            return {
                ...state,
                newNoteCategory: {
                    ...state.newNoteCategory,
                    projectId: action.payload.projectId
                },
                newNote: {
                    ...state.newNote,
                    projectId: action.payload.projectId
                }
            }
        }

        //FOR NOTES
        case "UPDATE_NOTE_INPUT": {
            return {
                ...state,
                newNote: {
                    ...state.newNote,
                    [action.payload.name]: action.payload.value
                }
            }
        }
        case "NOTE_CATEGORY_ID": {
            return {
                ...state,
                newNote: {
                    ...state.newNote,
                    categoryId: action.payload.categoryId
                }
            }
        }
        

        //FOR ALL FORMS
        case "RESET_INPUTS": {
            return {
                ...state,
                newProject: initialState.newProject,
                newTaskColumn: {
                    ...state.newTaskColumn,
                    columnName: ""
                },
                newTask: {
                    ...state.newTask,
                    description: "",
                    inCharge: [],
                },
                newNoteCategory: {
                    ...state.newNoteCategory,
                    categoryName: ""
                },
            }
        }
        default:
            return state;
    }
}


export default form