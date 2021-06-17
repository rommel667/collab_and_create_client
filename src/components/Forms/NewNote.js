import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TextArea from '../SharedComponents/TextArea'




const NewNote = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.form.newNote)


    const onChangeInput = (event) => {
        dispatch({ type: "UPDATE_NOTE_INPUT", payload: event.target })
    }

    
    return (
        <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">

                
                <TextArea
                rows={12}
                    value={data.description}
                    onChange={onChangeInput}
                    label="Note Description"
                    id="description"
                    name="description"
                    type=""
                    autoComplete="text"
                    placeholder="Note Description"
                />
                
            </div>

        </form>
    )
}

export default NewNote