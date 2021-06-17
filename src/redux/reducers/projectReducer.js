const initialState = {
    projects: null,
    projectData: null
}


const project = (state = initialState, action) => {
    console.log(action);
    switch(action.type) {
        case "FETCH_PROJECTS": {
            const projectsClone = [ ...action.payload.projects ]
            const sortedProjects = projectsClone.sort( (a, b) => {
                const d1 = new Date(a.createdAt)
                const d2 = new Date(b.createdAt)
                return d1.getTime() - d2.getTime()
            } )
            return {
                ...state,
                projects: sortedProjects
            }
        }
        case "NEW_PROJECT": {
            return {
                ...state,
                projects: [ ...state.projects, action.payload.newProject ]
            }
        }
        case "ACCEPT_PROJECT_INVITE": {
            return {
                ...state,
                projects: [ ...state.projects, action.payload.project ]
            }
        }
        case "SELECTED_PROJECT_DATA": {
            return {
                ...state,
                projectData: action.payload.project
            }
        }
        case "MOVE_TASK_SUBSCRIPTION_PROJECT_UPDATE": {
            const filteredProjects = state.projects?.filter(project => project._id !== action.payload.project._id )
            const newProjects = [ ...filteredProjects, action.payload.project ].sort( (a, b) => {
                const d1 = new Date(a.createdAt)
                const d2 = new Date(b.createdAt)
                return d1.getTime() - d2.getTime()
            } )
            return {
                ...state,
                projects: newProjects,
                projectData: action.payload.project
            }
        }
        default: {
            return state;
        }
    }
}

export default project