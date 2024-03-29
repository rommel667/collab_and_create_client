import { combineReducers } from 'redux'
import userReducer from './userReducer'
import formReducer from './formReducer'
import notificatioReducer from './notificationReducer'
import projectReducer from './projectReducer'
import taskReducer from './taskReducer'
import noteReducer from './noteReducer'
import devReducer from './devReducer'


const rootReducer = combineReducers({
    user: userReducer,
    form: formReducer,
    notification: notificatioReducer,
    project: projectReducer,
    task: taskReducer,
    note: noteReducer,
    dev: devReducer,
})

export default rootReducer