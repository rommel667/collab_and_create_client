import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login(
  $email: String!
  $password: String!
) {
    login(
        email: $email
        password: $password
    ) {
      _id
      email
      name
      photo
      token
      verified
    }
}

`

export const REGISTER_USER = gql`
mutation registerUser(
    $name: String!
    $email: String!
    $password: String!
) {
    registerUser(
        userInput: {
            name: $name
            email: $email
            password: $password
        }) {
          _id
          email
        name
        
    }
}

`

export const SIGN_IN_WITH_GOOGLE = gql`
mutation signInWithGoogle(
  $name: String!
  $email: String!
  $photo: String!
  $token: String!
) {
  signInWithGoogle(
        name: $name 
        email: $email
        photo: $photo
        token: $token
    ) {
      _id
      email
      name
      photo
      token
    }
}

`

export const VERIFY_USER = gql`
mutation verifyUser(
    $email: String!
    $code: String!
) {
    verifyUser(
            email: $email
            code: $code
        ) {
            _id
            email
            name
            photo
            token
            verified
    }
}

`

export const RESEND_CODE = gql`
mutation resendCode(
    $email: String!
) {
    resendCode(email: $email) {
        _id
        email
        name
        
    }
}

`

export const FORGOT_PASSWORD_EMAIL = gql`
mutation forgotPasswordEmail(
    $email: String!
) {
  forgotPasswordEmail(email: $email) {
        _id
        email
    }
}

`

export const FORGOT_PASSWORD_CODE = gql`
mutation forgotPasswordCode(
  $email: String!
  $code: String!
) {
  forgotPasswordCode(
      email: $email
      code: $code
  ) {
        _id
        email
    }
}

`

export const NEW_PASSWORD = gql`
mutation newPassword(
  $email: String!
  $password: String!
) {
    newPassword(
        email: $email
        password: $password
    ) {
      _id
      email
    }
}

`

