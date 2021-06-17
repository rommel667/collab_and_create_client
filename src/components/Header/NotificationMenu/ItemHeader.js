import React from 'react'

const ItemHeader = ({ photo, name, email }) => {
    return (
        <div className="flex items-center gap-3 border-b-2">
            <img
                className="h-6 w-6 rounded-full object-cover"
                src={photo}
                alt="createdBy"
            />
            <div>
                <p className="text-sm font-semibold text-gray-700">{name}</p>
                <p className="text-xs text-gray-600">{email}</p>
            </div>

        </div>
    )
}

export default ItemHeader