import { useMutation, useQuery } from '@apollo/client';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CANCEL_REQUEST, FETCH_PENDING_INVITES_REQUEST } from '../../../../graphql/dev';

const PendingRequest = ({ request }) => {

    const dispatch = useDispatch()

    const [cancelRequest] = useMutation(CANCEL_REQUEST, {
        update(proxy, result) {
          dispatch({ type: "CANCEL_REQUEST_ON_PENDING", payload: { cancelRequest: result.data.cancelRequest } })
        },
        variables: {
            colleagueId: request._id
        }
      })
    

    

    return (
        <div>
            <p>{request.name}</p>
            <p>{request.email}</p>
           
            <button onClick={cancelRequest}>Cancel</button>
        </div>
    )
}

export default PendingRequest