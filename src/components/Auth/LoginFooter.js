import React from 'react'
import { useHistory } from 'react-router-dom'

const LoginFooter = ({ rememberMe, setRememberMe }) => {

  const history = useHistory()


  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          value={rememberMe}
          checked={rememberMe}
          onChange={setRememberMe}
          id="remember_me"
          name="remember_me"
          type="checkbox"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>

      <div className="text-sm">
        <p
          onClick={() => history.push('/forgotPassword')}
          className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
          Forgot your password?
        </p>
      </div>
    </div>
  )
}

export default LoginFooter