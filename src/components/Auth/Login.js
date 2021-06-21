import React, { useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import Input from '../SharedComponents/Input'
import Button from '../SharedComponents/Button'
import LoginFooter from './LoginFooter'
import AuthHeader from './AuthHeader'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { LOGIN_USER, SIGN_IN_WITH_GOOGLE } from '../../graphql/auth'
import GoogleLogin from 'react-google-login'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ rememberMe, setRememberMe ] = useState(false)

 
  const dispatch = useDispatch()

  const [loginUser] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      setEmail('')
      setPassword('')
      rememberMe ? 
      dispatch({ type: "LOGIN_REMEMBER_ME_TRUE", payload: { user: result.data.login } }) :
      dispatch({ type: "LOGIN_REMEMBER_ME_FALSE", payload: { user: result.data.login } })
    },
    variables: {
      email, password
    }
  })

  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);

  const [googleSignin] = useMutation(SIGN_IN_WITH_GOOGLE, {
    update(proxy, result) {
      dispatch({ type: "LOGIN", payload: { user: result.data.signInWithGoogle } })
    },
    // onError(err) {
    //   setError(err.graphQLErrors[0].message.split(': ')[1]);
    // }
  })

  const handleSubmit = (e) => {
    if (email === "" || password === "") {
      return
    }
    e.preventDefault()
    loginUser()
  }

  const responseGoogle = (response) => {
    googleSignin({
      variables: {
        name: response.profileObj.name, email: response.profileObj.email, photo: response.profileObj.imageUrl, token: response.tokenId
      }
    })
  }



  return (
    <div className="bg-white min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">

        <AuthHeader
          headerText="Sign in to your account"
        />

        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              label="Email address"
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
            />
            <Input
              value={password}
              onChange={e => setPassword(e.target.value)}
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
            />

          </div>

          <LoginFooter
            rememberMe={rememberMe}
            setRememberMe={() =>setRememberMe(!rememberMe)}
          />

          <Button buttonText="Sign in">
            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
          </Button>

        </form>

        
        <div className="flex flex-row items-center justify-center gap-1">
          <div className="border-t-2 flex flex-1"></div>
          <div className="bg-gray-300 p-2 rounded-full font-semibold text-xs">OR</div>
          <div className="border-t-2 flex flex-1"></div>
        </div>




        <GoogleLogin
          className="w-full flex items-center justify-center"
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText='Sign in with Google'
          cookiePolicy={'single_host_origin'}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          theme="dark"
        />
        {/* tqxDTemkN114aUeHrX1n-Mpr */}
      </div>






    </div>
  )
}



export default Login
