import { useSubscription } from "@apollo/client";
import { NEW_PROJECT_SUBSCRIPTION } from "../graphql/projects";

const ProjectSubscription = ({ dispatch, user }) => {


    const { loading: projectLoading, data: projectData } = useSubscription(NEW_PROJECT_SUBSCRIPTION,
        {
            variables: { userId: user?._id },
            onSubscriptionData: ({ subscriptionData }) => {
                dispatch({ type: "NEW_PROJECT_INVITE", payload: subscriptionData.data.newProject })
            }
        }
    );

    return null
}

export default ProjectSubscription