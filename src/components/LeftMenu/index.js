import React from 'react'
import Logo from '../SharedComponents/Logo'
import MenuGroup from './MenuGroup'

const menuArray = [
  {
    groupText: "Projects",
    menus: [
      { text: "Ongoing", path: "/projects/ongoing" },
      { text: "Finished", path: "/projects/finished" },
      { text: "Cancelled", path: "/projects/cancelled" },
    ],
  },
  {
    groupText: "Tasks",
    menus: [
      { text: "Personal Tasks", path: "/tasks/personaltasks" },
      { text: "Project Tasks", path: "/tasks/projecttasks" },
      { text: "Assigned to me", path: "/tasks/assignedtome" },
      { text: "Created by me", path: "/tasks/createdbyme" },
    ]
  },
  {
    groupText: "Notes",
    menus: [
      { text: "Personal Notes", path: "/notes/personalnotes" },
      { text: "Project Notes", path: "/notes/projectnotes" },
      { text: "Created by me", path: "/notes/createdbyme" },
    ]
  },
  {
    groupText: "Devs",
    menus: [
      { text: "My Colleagues", path: "/devs/colleagues" },
      { text: "My Teams", path: "/devs/teams" },
      { text: "Suggestions", path: "/devs/suggestions" },
    ]
  },
]

const LeftMenu = () => {
  return (
    <div className="w-64 bg-gray-100 border-r px-8 py-4 overflow-auto hidden md:block">
      <Logo />
      <nav className="mt-8">
        {menuArray.map((group, index) => {
          return (
            <MenuGroup
              key={index}
              menuGroupText={group.groupText}
              menus={group.menus}
            />
          )
        })}
      </nav>
    </div>
  )
}

export default LeftMenu