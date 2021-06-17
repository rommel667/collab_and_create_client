import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../SharedComponents/Input'


const NewTaskColumn = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.form.newTaskColumn)

    const onChangeInput = (event) => {
        dispatch({ type: "UPDATE_TASK_COLUMN_INPUT", payload: event.target })
    }


    return (
        <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="">

                <Input
                    value={data.columnName}
                    onChange={onChangeInput}
                    label="Column Name"
                    id="columnName"
                    name="columnName"
                    type="text"
                    autoComplete="text"
                    placeholder="Column Name"
                />

                
            </div>

        </form>
    )
}

export default NewTaskColumn