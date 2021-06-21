import React from 'react'
import { Menu } from '@headlessui/react'
import ProjectDescription from './ProjectDescription'
import { useSelector } from 'react-redux'
import ItemButtons from './ItemButtons'
import ItemHeader from './ItemHeader'
import ItemFooter from './ItemFooter'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const NotificationItem = ({ ...project }) => {

    const acceptedInvites = useSelector(state => state.notification.acceptedInvites)
    const rejectedInvites = useSelector(state => state.notification.rejectedInvites)

    return (
        <Menu.Item>
            {({ active }) => (
                <div
                    className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-4 text-sm text-gray-700 cursor-pointer border-b-2'
                    )}
                >
                    <div>
                        <ItemHeader
                            photo={project.createdBy.photo}
                            name={project.createdBy.name}
                            email={project.createdBy.email}
                        />
                        <div className="border-b-2 py-4">
                            <p className="text-xs font-semibold text-gray-600">Title:</p>
                            <ProjectDescription projectName={project.projectName} description={project.description} />
                        </div>
                        
                        <ItemFooter
                            acceptedInvites={acceptedInvites}
                            rejectedInvites={rejectedInvites}
                            projectId={project._id}
                        />

                        <ItemButtons
                            acceptedInvites={acceptedInvites}
                            rejectedInvites={rejectedInvites}
                            projectId={project._id}
                        />

                    </div>

                </div>
            )}
        </Menu.Item>
    )
}



export default NotificationItem