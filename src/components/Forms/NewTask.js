import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import TextArea from '../SharedComponents/TextArea'
import MultiSelect from 'react-multi-select-component'


const Label = ({ photo, name }) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            <img
                className="h-6 w-6 rounded-full object-cover"
                src={photo}
                alt="member"
            />
            <p className="text-sm font-semibold text-gray-700">{name}</p>
        </div>
    )
}


const NewTask = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.form.newTask)

    const { projectId } = useParams()

    const [selected, setSelected] = useState([]);

    const projectMembers = useSelector(state => state.project.projects).find(project => project._id === projectId).confirmedMembers

    const options = projectMembers.map(member => {
        return { label: <Label photo={member.photo} name={member.name} />, value: member._id }
    })

    

    const onChangeInput = (event) => {
        dispatch({ type: "UPDATE_TASK_INPUT", payload: event.target })
    }

    const onChangeMembers = (items) => {
        setSelected(items)
        dispatch({ type: "SELECT_IN_CHARGE", payload: { items } })
    }
    


    return (
        <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">

                
                <MultiSelect
                    options={options}
                    value={selected}
                    onChange={onChangeMembers}
                    labelledBy="In Charge"
                    className="z-50 overflow-y-visible"
                />
                <TextArea
                rows={12}
                    value={data.description}
                    onChange={onChangeInput}
                    label="Task Description"
                    id="description"
                    name="description"
                    type=""
                    autoComplete="text"
                    placeholder="Task Description"
                />
                
            </div>

        </form>
    )
}

export default NewTask