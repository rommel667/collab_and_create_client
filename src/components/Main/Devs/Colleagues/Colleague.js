import React from 'react'

const Colleague = ({ colleague }) => {

    return (
        <div>
            <p>{colleague.name}</p>
            <p>{colleague.email}</p>
        </div>
    )
}

export default Colleague