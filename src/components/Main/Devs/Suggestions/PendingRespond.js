import { useMutation, useQuery } from '@apollo/client';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ACCEPT_INVITE, FETCH_PENDING_INVITES_RESPOND, REJECT_INVITE } from '../../../../graphql/dev';

const PendingRespond = ({ respond }) => {

    const dispatch = useDispatch()

    

    const [acceptInvite] = useMutation(ACCEPT_INVITE, {
        update(proxy, result) {
          dispatch({ type: "ACCEPT_INVITE", payload: { acceptInvite: result.data.acceptInvite } })
        },
        variables: {
            colleagueId: respond._id
        }
      })

      const [rejectInvite] = useMutation(REJECT_INVITE, {
        update(proxy, result) {
          dispatch({ type: "REJECT_INVITE", payload: { rejectInvite: result.data.rejectInvite } })
        },
        variables: {
            colleagueId: respond._id
        }
      })
    

    

    return (
        <div>
            <p>{respond.name}</p>
            <p>{respond.email}</p>
           
            <button className="bg-indigo-500 px-2 rounded-md mr-1 text-sm text-gray-200 font-semibold" onClick={acceptInvite}>Accept</button>
            <button className="bg-indigo-500 px-2 rounded-md mr-1 text-sm text-gray-200 font-semibold" onClick={rejectInvite}>Reject</button>
        </div>
    )
}

export default PendingRespond