const initialState = {
    darkMode: null,
}


const theme = (state = initialState, action) => {
    console.log(action);
    switch(action.type) {
        case "TOGGLE_MODE": {
            return {
                ...state,
                darkMode: action.payload.darkMode
            }
        }
        default: {
            return state;
        }
    }
}

export default theme