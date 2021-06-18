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
        case "NEW_NOTE_SUBSCRIPTION": {
            const newNoteCategories = [ ...state.noteCategories ]
            let targetCategory = state.noteCategories.find(cat =>  cat._id === action.payload.newNote.categoryId)
            targetCategory =  { ...targetCategory, notes: [ action.payload.newNote, ...targetCategory.notes ] }
            newNoteCategories[state.noteCategories.findIndex(cat =>  cat._id === action.payload.newNote.categoryId)] = targetCategory
            return {
                ...state,
                noteCategories: newNoteCategories
            }
        }
        case "MOVE_NOTE_SUBSCRIPTION": {
            const tempNoteCategories = [ ...state.noteCategories ]
            const sourceIndex = tempNoteCategories.findIndex(c => c._id === action.payload.moveNote.sourceCategoryId)
            const destinationIndex = tempNoteCategories.findIndex(c => c._id === action.payload.moveNote.destinationCategoryId)
            const note = tempNoteCategories[sourceIndex].notes.find(n => n._id === action.payload.moveNote.noteId)
            tempNoteCategories[sourceIndex] = {
                ...tempNoteCategories[sourceIndex],
                notes: tempNoteCategories[sourceIndex].notes.filter(n => n._id !== action.payload.moveNote.noteId)
            }
            tempNoteCategories[destinationIndex] = {
                ...tempNoteCategories[destinationIndex],
                notes: [ note, ...tempNoteCategories[destinationIndex].notes ]
            }
            return {
                ...state,
                noteCategories: tempNoteCategories
            }
        }
        default: {
            return state;
        }
    }
}

export default note