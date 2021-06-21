import React, { useState } from 'react'
import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableComponent from './DraggableComponent'

const DroppableComponent = ({ noteCategories, getItemStyle, setOpen }) => {

  return (
    noteCategories.map((el, ind) => (
      <Draggable
        key={el._id}
        draggableId={el._id}
        index={ind}
      >
        {(provided, snapshot) => (
          <div
         
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-gray-100 rounded-md p-2 flex flex-col h-full w-full"
            style={{ ...provided.draggableProps.style }}
          >
            <div className="flex flex-row justify-between items-center mb-2" {...provided.dragHandleProps}>
              {el.categoryName}
              <svg onClick={() => setOpen(el._id)} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <Droppable droppableId={el._id} type="note" index={ind}>
              {(provided, snapshot) => {
                return (
                  <div
                    className={`${snapshot.isDraggingOver ? "bg-blue-200" : "bg-gray-100"} rounded-md p-1 flex-1 overflow-auto no-scrollbar`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <ul className="space-y-2 flex-1">
                      <DraggableComponent notes={el.notes} getItemStyle={getItemStyle} />
                    </ul>
                    {provided.placeholder}
                  </div>
                )
              }}
            </Droppable>
          </div>
        )}
      </Draggable>
    ))
  )
}

export default DroppableComponent