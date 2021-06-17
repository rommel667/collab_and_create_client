import { useMutation } from '@apollo/client';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SEND_INVITE, CANCEL_REQUEST } from '../../../../graphql/dev';

const Suggestion = ({ suggestion }) => {

    const dispatch = useDispatch()
    const recentInvites = useSelector(state => state.dev.recentInvites)

    const [sendInvite] = useMutation(SEND_INVITE, {
        update(proxy, result) {
            dispatch({ type: "SEND_INVITE", payload: { newInvite: result.data.sendInvite } })
        },
        variables: {
            colleagueId: suggestion._id
        }
    })

    const [cancelRequest] = useMutation(CANCEL_REQUEST, {
        update(proxy, result) {
            dispatch({ type: "CANCEL_REQUEST_ON_SUGGESTIONS", payload: { cancelRequest: result.data.cancelRequest } })
        },
        variables: {
            colleagueId: suggestion._id
        }
    })

    return (
        <div className="flex flex-row items-center gap-2">

            <img
                className="h-12 w-12 rounded-full object-cover"
                src={suggestion.photo}
                alt="createdBy"
            />
            <div>
                <p className="text-sm font-semibold text-gray-700">{suggestion.name}</p>
                <p className="text-xs text-gray-600">{suggestion.email}</p>
                {recentInvites.includes(suggestion._id) && <p>Request Sent</p>}
                {recentInvites.includes(suggestion._id) ?
                <button onClick={cancelRequest}>Cancel</button> :
                <button className="bg-indigo-500 px-2 rounded-md mr-1 text-sm text-gray-200 font-semibold" onClick={sendInvite}>Invite</button>}
                <button className="bg-indigo-500 px-2 rounded-md text-sm text-gray-200 font-semibold" onClick={sendInvite}>Profile</button>
            </div>


        </div>
    )
}

export default Suggestion