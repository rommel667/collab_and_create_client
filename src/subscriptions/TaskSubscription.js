import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PROJECTS_BY_USER, PROJECT_TASKS } from "../graphql/projects";
import { MOVE_TASK_COLUMN_SUBSCRIPTION, MOVE_TASK_SUBSCRIPTION, NEW_TASK_SUBSCRIPTION } from "../graphql/task";
import { moveTaskSubNewData, newTaskSubNewData } from "../utils/cacheData/subscription";

const TaskSubscription = ({ user, dispatch, projectId }) => {


    const { loading: taskLoading, data: taskData } = useSubscription(NEW_TASK_SUBSCRIPTION,
        {
          variables: { userId: user?._id },
          onSubscriptionData: ({ client, subscriptionData }) => {
            const data = client.readQuery({
              query: PROJECT_TASKS,
              variables: { projectId: subscriptionData.data.newTask.projectId },
            });
            const data1 = client.readQuery({
              query: PROJECTS_BY_USER,
            });
            if (data) {
              console.log("PROJECT INFO");
              const updatedColumn = newTaskSubNewData(data.projectInfo, subscriptionData)
              client.writeQuery({
                query: PROJECT_TASKS,
                variables: { projectId },
                data: {
                  projectInfo: {
                    ...data.projectInfo,
                    taskColumns: [...data.projectInfo.taskColumns.filter(col => col._id !== subscriptionData.data.newTask.columnId), updatedColumn]
                  }
                }
              });
              dispatch({
                type: "NEW_TASK_SUBSCRIPTION_PROJECT_UPDATE", payload: {
                  project: {
                    ...data.projectInfo,
                    taskColumns: [...data.projectInfo.taskColumns.filter(col => col._id !== subscriptionData.data.newTask.columnId), updatedColumn]
                  }
                }
              })
            } else {
              if (data1) {
                console.log("PROJECT BY USER");
                const filteredProjects = data1.projectsByUser.filter(p => p._id !== subscriptionData.data.newTask.projectId)
                const targetProject = data1.projectsByUser.find(p => p._id === subscriptionData.data.newTask.projectId)
                const updatedColumn = newTaskSubNewData(targetProject, subscriptionData)
                const updatedProject = {
                  ...targetProject, taskColumns: [
                    ...targetProject.taskColumns.filter(col => col._id !== subscriptionData.data.newTask.columnId), updatedColumn
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
    
            dispatch({ type: "NEW_TASK_SUBSCRIPTION", payload: { newTask: subscriptionData.data.newTask } })
          },
        }
      );
    
      const { loading: moveTaskLoading, data: moveTaskData } = useSubscription(MOVE_TASK_SUBSCRIPTION,
        {
          variables: { userId: user?._id },
          onSubscriptionData: ({ client, subscriptionData }) => {
            const { sourceColumnId, destinationColumnId, taskId, projectId } = subscriptionData.data.moveTask
            const data = client.readQuery({
              query: PROJECT_TASKS,
              variables: { projectId },
            });
            const data1 = client.readQuery({
              query: PROJECTS_BY_USER,
            });
            if (data) {
              console.log("PROJECT INFO");
              const updatedTaskColumns =  moveTaskSubNewData(data.projectInfo, sourceColumnId, destinationColumnId, taskId)
              const newData = {
                ...data.projectInfo, taskColumns: [...updatedTaskColumns]
              }
              client.writeQuery({
                query: PROJECT_TASKS,
                variables: { projectId },
                data: { projectInfo: { ...newData } }
              });
              dispatch({
                type: "MOVE_TASK_SUBSCRIPTION_PROJECT_UPDATE", payload: {
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
                const updatedTaskColumns =  moveTaskSubNewData(targetProject, sourceColumnId, destinationColumnId, taskId)
                const newData = {
                  ...targetProject, taskColumns: [...updatedTaskColumns]
                }
                console.log(newData);
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
    
            dispatch({ type: "MOVE_TASK_SUBSCRIPTION", payload: { moveTask: subscriptionData.data.moveTask } })
          }
        }
      );
    
      const { loading: moveTaskColumnLoading, data: moveTaskColumnData } = useSubscription(MOVE_TASK_COLUMN_SUBSCRIPTION,
        {
          variables: { userId: user?._id },
          onSubscriptionData: ({ client, subscriptionData }) => {
            const data = client.readQuery({
              query: PROJECT_TASKS,
              variables: { projectId: subscriptionData.data.moveTaskColumn.projectId },
            });
            const updatedTaskColumns = []
            subscriptionData.data.moveTaskColumn.newSequenceIds.map((seq, index) => {
              data.projectInfo.taskColumns.map(col => {
                if (seq === col._id) {
                  updatedTaskColumns.push({ ...col, sequence: index + 1 })
                }
                return null
              })
              return null
            })
            client.writeQuery({
              query: PROJECT_TASKS,
              variables: { projectId: subscriptionData.data.moveTaskColumn.projectId },
              data: {
                projectInfo: {
                  ...data.projectInfo,
                  taskColumns: [...updatedTaskColumns]
                }
              }
            });
            dispatch({ type: "MOVE_TASK_COLUMN_SUBSCRIPTION", payload: { newSequence: subscriptionData.data.moveTaskColumn.newSequenceIds } })
          }
        }
      );

      return null
    
}

export default TaskSubscription