const initialState = {
    colleagues: [],
    suggestions: [],
    recentInvites: [],
    pendingRequest: [],
    pendingRespond: []
}


const dev = (state = initialState, action) => {

    switch(action.type) {

        //COLLEAGUES
        case "FETCH_COLLEAGUES": {
            return {
                ...state,
                colleagues: action.payload.colleagues
            }
        }

        //SUGGESTIONS
        case "FETCH_SUGGESTIONS": {
            return {
                ...state,
                suggestions: action.payload.suggestions
            }
        }
        case "SEND_INVITE": {
            return {
                ...state,
                recentInvites: [ ...state.recentInvites, action.payload.newInvite._id ] 
            }
        }
        case "CANCEL_REQUEST_ON_SUGGESTIONS": {
            return {
                ...state,
                recentInvites: state.recentInvites.filter(id => id !== action.payload.cancelRequest._id )
            }
        }

        //INVITE REQUEST
        case "FETCH_PENDING_INVITES_REQUEST": {
            return {
                ...state,
                pendingRequest: action.payload.pendingInvitesRequest
            }
        }
        case "CANCEL_REQUEST_ON_PENDING": {
            return {
                ...state,
                pendingRequest: state.pendingRequest.filter(request => request._id !== action.payload.cancelRequest._id )
            }
        }

        //INVITE RESPOND
        case "FETCH_PENDING_INVITES_RESPOND": {
            return {
                ...state,
                pendingRespond: action.payload.pendingInvitesRespond
            }
        }
        case "RESPOND_ACCEPT_INVITE": {
            return {
                ...state,
                colleagues: [ ...state.colleagues, action.payload.acceptInvite ],
                pendingRespond: state.pendingRespond.filter(respond => respond._id !== action.payload.acceptInvite._id )
            }
        }
        case "RESPOND_REJECT_INVITE": {
            return {
                ...state,
                pendingRespond: state.pendingRespond.filter(respond => respond._id !== action.payload.rejectInvite._id )
            }
        }

        default: {
            return state;
        }
    }
}

export default dev