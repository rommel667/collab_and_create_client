import { gql } from '@apollo/client';


// QUERIES

export const FETCH_COLLEAGUES = gql`
query {
    colleagues {
        _id
        name
        email
        photo
    }
  }
`

export const FETCH_SUGGESTIONS = gql`
query {
  suggestions {
        _id
        name
        email
        photo
    }
  }
`

export const FETCH_PENDING_INVITES_REQUEST = gql`
query {
  pendingInvitesRequest {
        _id
        name
        email
        photo
    }
  }
`

export const FETCH_PENDING_INVITES_RESPOND = gql`
query {
  pendingInvitesRespond {
        _id
        name
        email
        photo
    }
  }
`

// MUTATIONS

export const SEND_INVITE = gql`
mutation sendInvite(
    $colleagueId: ID!
) {
  sendInvite(colleagueId: $colleagueId) {
    _id
    name
    email
    photo
  }
}

`

export const CANCEL_REQUEST = gql`
mutation cancelRequest(
    $colleagueId: ID!
) {
  cancelRequest(colleagueId: $colleagueId) {
    _id
    name
    email
    photo
  }
}

`

export const ACCEPT_INVITE = gql`
mutation acceptInvite(
    $colleagueId: ID!
) {
  acceptInvite(colleagueId: $colleagueId) {
    _id
    name
    email
    photo
  }
}

`

export const REJECT_INVITE = gql`
mutation rejectInvite(
    $colleagueId: ID!
) {
  rejectInvite(colleagueId: $colleagueId) {
    _id
    name
    email
    photo
  }
}

`