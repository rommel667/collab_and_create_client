import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { useDispatch } from 'react-redux'

const ItemButtons = ({ acceptedInvites, rejectedInvites, projectId }) => {

    const dispatch = useDispatch()

    const [acceptProjectInvite] = useMutation(ACCEPT_PROJECT_INVITE, {
        update(proxy, result) {
            dispatch({ type: "ACCEPT_PROJECT_INVITE", payload: { project: result.data.acceptProjectInvite } })
        },
        variables: {
            projectId
        }
    })

    const [rejectProjectInvite] = useMutation(REJECT_PROJECT_INVITE, {
        update(proxy, result) {
            dispatch({ type: "REJECT_PROJECT_INVITE", payload: { project: result.data.rejectProjectInvite } })
        },
        variables: {
            projectId
        }
    })

    return (
        <>
        {acceptedInvites.includes(projectId) || rejectedInvites.includes(projectId) === false &&
            <div className="flex gap-1 mt-3">
                <button
                    onClick={acceptProjectInvite}
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-md py-1 px-2"
                >
                    <p className="text-gray-100">Accept</p>
                </button>
                <button
                    onClick={rejectProjectInvite}
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-md py-1 px-2"
                >
                    <p className="text-gray-100">Reject</p>
                </button>
                <button
                    onClick={() => console.log("NO")}
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-md py-1 px-2"
                >
                    <p className="text-gray-100">Details</p>
                </button>
            </div>}
            </>
    )
}

export const ACCEPT_PROJECT_INVITE = gql`
mutation acceptProjectInvite(
    $projectId: ID!
) {
    acceptProjectInvite(projectId: $projectId ) {
          _id
          projectName
          description
          icon
          status
          techStacks
          createdBy {
                _id
                name
                photo
            }
          unconfirmMembers {
                _id
                name
                photo
            }
          confirmedMembers {
              _id
              name
              photo
            }
          createdAt
          updatedAt
    }
}

`

export const REJECT_PROJECT_INVITE = gql`
mutation rejectProjectInvite(
    $projectId: ID!
) {
    rejectProjectInvite(projectId: $projectId ) {
          _id
          projectName
          description
          icon
          status
          techStacks
          createdBy {
                _id
                name
                photo
            }
          unconfirmMembers {
                _id
                name
                photo
            }
          confirmedMembers {
              _id
              name
              photo
            }
          createdAt
          updatedAt
    }
}

`

export default ItemButtons