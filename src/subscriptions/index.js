import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import ProjectSubscription from "./ProjectSubscription"
import TaskSubscription from "./TaskSubscription"

const Subscriptions = () => {

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const { projectId } = useParams()

    return (
        <>
        <ProjectSubscription dispatch={dispatch} user={user} />
        <TaskSubscription dispatch={dispatch} user={user} projectId={projectId} />
        </>
    )
}

export default Subscriptions