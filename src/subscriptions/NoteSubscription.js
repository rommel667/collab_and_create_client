import { useSubscription } from "@apollo/client";
import { MOVE_NOTE_SUBSCRIPTION, NEW_NOTE_SUBSCRIPTION } from "../graphql/note";
import { PROJECTS_BY_USER, PROJECT_INFO } from "../graphql/projects";
import { moveNoteSubNewData, newNoteSubNewData } from "../utils/cacheData/subscription";

const NoteSubscription = ({ dispatch, user, projectId }) => {

    const { loading: noteLoading, data: noteData } = useSubscription(NEW_NOTE_SUBSCRIPTION,
        {
          variables: { userId: user?._id },
          onSubscriptionData: ({ client, subscriptionData }) => {
            const data = client.readQuery({
              query: PROJECT_INFO,
              variables: { projectId: subscriptionData.data.newNote.projectId },
            });
            const data1 = client.readQuery({
              query: PROJECTS_BY_USER,
            });
            if (data) {
              console.log("PROJECT INFO");
              const updatedCategory = newNoteSubNewData(data.projectInfo, subscriptionData)
              client.writeQuery({
                query: PROJECT_INFO,
                variables: { projectId },
                data: {
                  projectInfo: {
                    ...data.projectInfo,
                    noteCategories: [...data.projectInfo.noteCategories.filter(cat => cat._id !== subscriptionData.data.newNote.categoryId), updatedCategory]
                  }
                }
              });
              dispatch({
                type: "NEW_NOTE_SUBSCRIPTION_PROJECT_UPDATE", payload: {
                  project: {
                    ...data.projectInfo,
                    noteCategories: [...data.projectInfo.noteCategories.filter(cat => cat._id !== subscriptionData.data.newNote.categoryId), updatedCategory]
                  }
                }
              })
            } else {
              if (data1) {
                console.log("PROJECT BY USER");
                const filteredProjects = data1.projectsByUser.filter(p => p._id !== subscriptionData.data.newTask.projectId)
                const targetProject = data1.projectsByUser.find(p => p._id === subscriptionData.data.newTask.projectId)
                const updatedCategory = newNoteSubNewData(targetProject, subscriptionData)
                const updatedProject = {
                  ...targetProject, noteCategories: [
                    ...targetProject.noteCategories.filter(col => col._id !== subscriptionData.data.newNote.categoryId), updatedCategory
                  ]
                }
                const newData = [...filteredProjects, updatedProject]
                client.writeQuery({
                  query: PROJECTS_BY_USER,
                  data: {
                    projectsByUser: [
                      ...newData
                    ]
                  }
                });
    
                dispatch({ type: "FETCH_PROJECTS", payload: { projects: [...newData] } })
              } else {
                return
              }
              return
            }
    
            dispatch({ type: "NEW_NOTE_SUBSCRIPTION", payload: { newNote: subscriptionData.data.newNote } })
          },
        }
      );


      const { loading: moveNoteLoading, data: moveNoteData } = useSubscription(MOVE_NOTE_SUBSCRIPTION,
        {
          variables: { userId: user?._id },
          onSubscriptionData: ({ client, subscriptionData }) => {
            const { sourceCategoryId, destinationCategoryId, noteId, projectId } = subscriptionData.data.moveNote
            const data = client.readQuery({
              query: PROJECT_INFO,
              variables: { projectId },
            });
            const data1 = client.readQuery({
              query: PROJECTS_BY_USER,
            });
            if (data) {
              console.log("PROJECT INFO");
              const updatedNoteCategories =  moveNoteSubNewData(data.projectInfo, sourceCategoryId, destinationCategoryId, noteId)
              const newData = {
                ...data.projectInfo, noteCategories: [...updatedNoteCategories]
              }
              client.writeQuery({
                query: PROJECT_INFO,
                variables: { projectId },
                data: { projectInfo: { ...newData } }
              });
              dispatch({
                type: "MOVE_NOTE_SUBSCRIPTION_PROJECT_UPDATE", payload: {
                  project: {
                    ...newData
                  }
                }
              })
            } else {
              if (data1) {
                console.log("PROJECT BY USER");
                const filteredProjects = data1.projectsByUser.filter(p => p._id !== projectId)
                const targetProject = data1.projectsByUser.find(p => p._id === projectId)
                const updatedNoteCategories =  moveNoteSubNewData(targetProject, sourceCategoryId, destinationCategoryId, noteId)
                const newData = {
                  ...targetProject, noteCategories: [...updatedNoteCategories]
                }
                client.writeQuery({
                  query: PROJECTS_BY_USER,
                  data: {
                    projectsByUser: [
                      ...filteredProjects,
                      { ...newData }
                    ]
                  }
                });
    
                dispatch({ type: "FETCH_PROJECTS", payload: { projects: [...filteredProjects, { ...newData }] } })
              } else {
                return
              }
              return
            }
    
            dispatch({ type: "MOVE_NOTE_SUBSCRIPTION", payload: { moveNote: subscriptionData.data.moveNote } })
          }
        }
      );
    
    return null
}

export default NoteSubscription