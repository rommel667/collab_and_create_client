import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Note from './Note'

const DraggableComponent = ({ notes }) => {
  return (
    notes?.map((note, index) => {
      return (
        <Draggable
          key={note._id}
          draggableId={note._id}
          index={index}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{ ...provided.draggableProps.style }}
            >
              <Note
                description={note.description}
                photo={note.createdBy.photo}
                createdAt={note.createdAt}
                isDragging={snapshot.isDragging}
                draggableStyle={provided.draggableProps.style}
              />
            </div>
          )}
        </Draggable>
      )
    })
  )
}

export default DraggableComponent