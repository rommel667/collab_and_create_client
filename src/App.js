import React from 'react'
import LeftMenu from './components/LeftMenu';
import Header from './components/Header'
import Main from './components/Main';
import { useDispatch, useSelector } from 'react-redux';
import Homepage from './components/Homepage';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { useParams } from 'react-router';
import { MOVE_TASK_COLUMN_SUBSCRIPTION, NEW_TASK_SUBSCRIPTION, MOVE_TASK_SUBSCRIPTION } from './graphql/task';
import { FETCH_COLLEAGUES } from './graphql/dev';
import { PROJECTS_BY_USER, PROJECT_TASKS } from './graphql/projects';
import Theme from './components/Theme';
// import { Offline, Online } from "react-detect-offline";


const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const { projectId } = useParams()

  const { data: colleaguesData } = useQuery(
    FETCH_COLLEAGUES,
    {
      onCompleted: () => {
        dispatch({ type: "FETCH_COLLEAGUES", payload: { colleagues: colleaguesData.colleagues } })
      }
    })

  const { loading: projectLoading, data: projectData } = useSubscription(NEW_PROJECT_SUBSCRIPTION,
    {
      variables: { userId: user?._id },
      onSubscriptionData: ({ subscriptionData }) => {
        dispatch({ type: "NEW_PROJECT_INVITE", payload: subscriptionData.data.newProject })
      }
    }
  );

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
          const targetColumn = data.projectInfo.taskColumns.find(col => col._id === subscriptionData.data.newTask.columnId)
          const updatedTasks = [...targetColumn.tasks, subscriptionData.data.newTask]
          const updatedColumn = { ...targetColumn, tasks: [...updatedTasks] }
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
            type: "SELECTED_PROJECT_DATA", payload: {
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
            console.log(filteredProjects);
            const targetProject = data1.projectsByUser.find(p => p._id === subscriptionData.data.newTask.projectId)
            const targetColumn = targetProject.taskColumns.find(col => col._id === subscriptionData.data.newTask.columnId)
            const updatedTasks = [...targetColumn.tasks, subscriptionData.data.newTask]
            const updatedColumn = { ...targetColumn, tasks: [...updatedTasks] }
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
          const filteredColumns = data.projectInfo.taskColumns.filter(col => col._id !== sourceColumnId && col._id !== destinationColumnId)
          const sourceColumn = data.projectInfo.taskColumns.find(col => col._id === sourceColumnId)
          const targetTask = sourceColumn.tasks.find(task => task._id === taskId)
          const updatedSourceColumn = { ...sourceColumn, tasks: [...sourceColumn.tasks.filter(task => task._id !== taskId)] }
          const destinationColumn = data.projectInfo.taskColumns.find(col => col._id === destinationColumnId)
          const updatedDestinationColumn = { ...destinationColumn, tasks: [targetTask, ...destinationColumn.tasks] }
          const updatedTaskColumns = [
            ...filteredColumns,
            updatedSourceColumn,
            updatedDestinationColumn
          ]
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
            const filteredColumns = targetProject.taskColumns.filter(col => col._id !== sourceColumnId && col._id !== destinationColumnId)
            const sourceColumn = targetProject.taskColumns.find(col => col._id === sourceColumnId)
            const targetTask = sourceColumn.tasks.find(task => task._id === taskId)
            const updatedSourceColumn = { ...sourceColumn, tasks: [...sourceColumn.tasks.filter(task => task._id !== taskId)] }
            const destinationColumn = targetProject.taskColumns.find(col => col._id === destinationColumnId)
            const updatedDestinationColumn = { ...destinationColumn, tasks: [targetTask, ...destinationColumn.tasks] }
            const updatedTaskColumns = [
              ...filteredColumns,
              updatedSourceColumn,
              updatedDestinationColumn
            ]
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


  return (
    <Theme>
      <div className=" h-screen flex overflow-hidden">
        {user && <LeftMenu />}
        <div className="bg-white flex flex-col flex-1 min-w-0 flex-shrink-0">
          <Header user={user} />
          {user && <Main user={user} />}
          {/* <Offline><h1>Please check your network status</h1></Offline> */}
          <Homepage user={user} projectId={projectId} />
        </div>

      </div>
    </Theme>
  );
}

export const NEW_PROJECT_SUBSCRIPTION = gql`
  subscription onNewProject($userId: ID!) {
    newProject(userId: $userId) {
        _id
        projectName
        description
        techStacks
        createdBy {
          _id
          email
          name
          photo
        }
        createdAt
        updatedAt
    }
  }
`;

export default App;
