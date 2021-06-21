import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'

const ProjectDescription = ({ projectName, description }) => {
    return (
        <div className="w-full pt-1">
            <div className="w-full max-w-md mx-auto bg-white rounded-md">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex justify-between w-full px-2 py-2 text-sm font-semibold text-left bg-purple-100 rounded-md hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span className="text-xs">{projectName}</span>
                                <ChevronUpIcon
                                    className={`${open ? 'transform rotate-180' : ''
                                        } w-5 h-5 text-purple-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="p-2 text-sm text-gray-500">
                                <p className="text-xs font-semibold">Description:</p>
                                <p className="text-xs">{description}</p>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

            </div>
        </div>
    )
}

export default ProjectDescription
