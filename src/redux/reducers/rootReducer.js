import { combineReducers } from 'redux'
import userReducer from './userReducer'
import formReducer from './formReducer'
import notificatioReducer from './notificationReducer'
import projectReducer from './projectReducer'
import taskReducer from './taskReducer'
import devReducer from './devReducer'
import themeReducer from './themeReducer'


const rootReducer = combineReducers({
    user: userReducer,
    form: formReducer,
    notification: notificatioReducer,
    project: projectReducer,
    task: taskReducer,
    dev: devReducer,
    theme: themeReducer,
})

export default rootReducer