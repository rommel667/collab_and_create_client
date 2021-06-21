import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../SharedComponents/Input'


const NewNoteCategory = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.form.newNoteCategory)

    const onChangeInput = (event) => {
        dispatch({ type: "UPDATE_NOTE_CATEGORY_INPUT", payload: event.target })
    }


    return (
        <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="">

                <Input
                    value={data.categoryName}
                    onChange={onChangeInput}
                    label="Note Category Name"
                    id="categoryName"
                    name="categoryName"
                    type="text"
                    autoComplete="text"
                    placeholder="Note Category Name"
                />

                
            </div>

        </form>
    )
}

export default NewNoteCategory