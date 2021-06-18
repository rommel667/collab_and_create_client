const initialState = {
    noteCategories: []
}


const note = (state = initialState, action) => {
   console.log(action);
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
                noteCategories: [ ...state.noteCategories, action.payload.newNoteCategory ]
            }
        }
        case "NEW_NOTE": {
            const newNoteCategories = [ ...state.noteCategories ]
            let targetCategory = state.noteCategories.find(cat =>  cat._id === action.payload.categoryId)
            targetCategory =  { ...targetCategory, notes: [ ...targetCategory.notes, action.payload.newNote ] }
            newNoteCategories[state.noteCategories.findIndex(cat =>  cat._id === action.payload.categoryId)] = targetCategory
            return {
                ...state,
                noteCategories: newNoteCategories
            }
        }
        case "ON_DRAG_END_NOTE_CATEGORY": {
            return {
                ...state,
                noteCategories: action.payload.newCategoryOrder
            }
        }
        case "ON_DRAG_END_NOTE": {
            return {
                ...state,
                noteCategories: action.payload.newNoteCategories
            }
        }
        default: {
            return state;
        }
    }
}

export default note