import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import Badge from './Badge'
import { gql, useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import NotificationList from './NotificationList'


const Notification = () => {

    const dispatch = useDispatch()
    const projectInvites = useSelector(state => state.notification.projectInvites)

    const [show, setShow] = useState(false)

    const { loading, data } = useQuery(
        FETCH_PROJECT_INVITES,
        {
            onCompleted() {
                dispatch({ type: "FETCH_PROJECT_INVITES", payload: data.unconfirmProjectInvites })
            }
        })


    return (
        <Menu  as="div" className="relative mt-2">
            {({ open }) => (
                <div className="">
                    <Badge show={show} projectInvites={projectInvites} setShow={() => setShow(!show)} />
                    <NotificationList show={show} projectInvites={projectInvites} />
                </div>
            )}
        </Menu>
    )
}

export const FETCH_PROJECT_INVITES = gql`
query {
    unconfirmProjectInvites {
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
`

export default Notification