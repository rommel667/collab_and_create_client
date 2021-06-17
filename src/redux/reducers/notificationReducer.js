const initialState = {
    projectInvites: [],
    acceptedInvites: [],
    rejectedInvites: []
}


const notification = (state = initialState, action) => {
    
    switch(action.type) {
        //From query
        case "FETCH_PROJECT_INVITES": {
            return {
                ...state,
                projectInvites: [ ...state.projectInvites, ...action.payload ]
            }
        }
        //From subscription
        case "NEW_PROJECT_INVITE": {
            return {
                ...state,
                projectInvites: [ ...state.projectInvites, action.payload ]
            }
        }
        case "ACCEPT_PROJECT_INVITE": {
            return {
                ...state,
                acceptedInvites: [ ...state.acceptedInvites, action.payload.project._id ]
            }
        }
        case "REJECT_PROJECT_INVITE": {
            return {
                ...state,
                rejectedInvites: [ ...state.rejectedInvites, action.payload.project._id ]
            }
        }
        
        default: {
            return state;
        }
    }
}

export default notification