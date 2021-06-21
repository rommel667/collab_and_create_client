import React, { useState } from 'react'
import Input from '../SharedComponents/Input'
import Button from '../SharedComponents/Button'
import AuthHeader from './AuthHeader'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router'
import { REGISTER_USER } from '../../graphql/auth'

const Register = ({ user }) => {

 const history = useHistory()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [addUser] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      localStorage.setItem('email', result.data.registerUser.email)
      history.push('/verification')
  },
    variables: {
      name, email, password
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      return
    }
    if (password !== confirmPassword) {
      return
    }
    addUser()
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="bg-white min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">

        <AuthHeader
          headerText="New account registration"
        />

        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Username"
              id="username"
              name="username"
              type="text"
              autoComplete="text"
              placeholder="Username"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email address"
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
            />
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="current-password"
              placeholder="Confirm Password"
            />

          </div>

          <Button buttonText="Register">
            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
          </Button>

        </form>
      </div>
    </div>
  )
}



export default Register