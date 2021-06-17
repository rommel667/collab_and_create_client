import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../SharedComponents/Input'
import projectIcons from '../Icons/ProjectIcons'
import MultiSelect from 'react-multi-select-component'
import TextArea from '../SharedComponents/TextArea'


const NewProject = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state.form.newProject)
    const colleagues = useSelector(state => state.dev.colleagues)

    // const memberOptions = [
    //     { label: "user1@user.com", value: "60bc96949a99333aec953a9d" },
    //     { label: "user2@user.com", value: "60bc99339a99333aec953aa1" },
    //     { label: "user3@user.com", value: "60bc99559a99333aec953aa5" },
    // ]

    const memberOptions = colleagues.map(col => {
        return { label: col.email, value: col._id }
    })

    const techStackOptions = [
        { label: "React", value: "React" },
        { label: "Vue", value: "Vue" },
        { label: "Angular", value: "Angular" },
    ]


    const onChangeInput = (event) => {
        dispatch({ type: "UPDATE_PROJECT_INPUT", payload: event.target })
    }

    const onSelectIcon = (iconName) => {
        dispatch({ type: "SELECT_ICON", payload: { icon: iconName } })
    }

    const onChangeMembers = (items) => {
        dispatch({ type: "SELECT_MEMBERS", payload: { items } })
    }

    const onChangeTechStacks = (items) => {
        dispatch({ type: "SELECT_TECH_STACKS", payload: { items } })
    }



    return (
        <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="">

                <p className="text-sm text-gray-500">Members</p>
                <MultiSelect
                    options={memberOptions}
                    value={data.unconfirmMembers}
                    onChange={onChangeMembers}
                    labelledBy="In Charge"
                    className="z-20 overflow-y-visible mb-5"
                />

                <p className="text-sm text-gray-500">TechStacks</p>
                <MultiSelect
                    options={techStackOptions}
                    value={data.techStacks}
                    onChange={onChangeTechStacks}
                    labelledBy="In Charge"
                    className="z-20 overflow-y-visible"
                />

                <Input
                    value={data.projectName}
                    onChange={onChangeInput}
                    label="Project Name"
                    id="projectName"
                    name="projectName"
                    type="text"
                    autoComplete="text"
                    placeholder="Project Name"
                />

                <TextArea
                    rows={8}
                    value={data.description}
                    onChange={onChangeInput}
                    label="Project Description"
                    id="description"
                    name="description"
                    type="text"
                    autoComplete="text"
                    placeholder="Project Description"
                />

                <div className="flex gap-2 items-center my-4">
                    <p className="text-gray-500">Choose icon:</p>
                    {projectIcons.map((icon, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => onSelectIcon(icon.iconName)}
                                className={`${data.icon === icon.iconName ? "border-2 border-indigo-700 rounded-full p-1" : ""} cursor-pointer`}>
                                {icon.component({ padding: 1, iconSize: 4 })}
                            </div>
                        )
                    })}
                </div>



            </div>

        </form>
    )
}

export default NewProject