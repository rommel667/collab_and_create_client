import React from 'react'
import { useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_PENDING_INVITES_REQUEST, FETCH_PENDING_INVITES_RESPOND, FETCH_SUGGESTIONS } from '../../../../graphql/dev';
import Suggestion from './Suggestion';
import PendingRequest from './PendingRequest';
import PendingRespond from './PendingRespond';

const Suggestions = () => {

    const dispatch = useDispatch()
    const suggestions = useSelector(state => state.dev.suggestions)
    const pendingRequest = useSelector(state => state.dev.pendingRequest)
    const pendingRespond = useSelector(state => state.dev.pendingRespond)

    const { loading: suggestionsLoading, data: suggestionsData } = useQuery(
        FETCH_SUGGESTIONS,
        {
            onCompleted: () => {
                dispatch({ type: "FETCH_SUGGESTIONS", payload: { suggestions: suggestionsData.suggestions } })
            }
        })

    const { loading: requestLoading, data: requestData } = useQuery(
        FETCH_PENDING_INVITES_REQUEST,
        {
            onCompleted: () => {
                dispatch({ type: "FETCH_PENDING_INVITES_REQUEST", payload: { pendingInvitesRequest: requestData.pendingInvitesRequest } })
            }
        })

    const { loading: respondLoading, data: respondData } = useQuery(
        FETCH_PENDING_INVITES_RESPOND,
        {
            onCompleted: () => {
                dispatch({ type: "FETCH_PENDING_INVITES_RESPOND", payload: { pendingInvitesRespond: respondData.pendingInvitesRespond } })
            }
        })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-3 mb-6">
                <h3>Suggestions</h3>
                {suggestions.map(suggestion => {
                    return (
                        <Suggestion key={suggestion._id} suggestion={suggestion} />
                    )
                })}
            </div>
            <div className="space-y-6">
                <div>
                    <h3>Pending Request</h3>
                    {pendingRequest.length === 0 && <p>No pending request</p>}
                    {pendingRequest.map(request => {
                        return (
                            <PendingRequest key={request._id} request={request} />
                        )
                    })}
                </div>
                <div>
                    <h3>Pending Respond</h3>
                    {pendingRespond.length === 0 && <p>No pending invitation received</p>}
                    {pendingRespond.map(respond => {
                        return (
                            <PendingRespond key={respond._id} respond={respond} />
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default Suggestions