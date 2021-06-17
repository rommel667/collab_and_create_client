const initialState = {
    noteCategories: []
}


const note = (state = initialState, action) => {
   
    switch(action.type) {
        case "FETCH_NOTE_CATEGORIES": {
            return {
                ...state,
                noteCategories: action.payload.noteCategories
            }
        }
        case "NEW_NOTE_CATEGORY": {
            return {
                ...state,
                noteCategories: [ ...state.noteCategories, action.payload.noteCategory ]
            }
        }
        
        
        default: {
            return state;
        }
    }
}

export default note