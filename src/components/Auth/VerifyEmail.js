import React, { useEffect, useState } from 'react'
import AuthHeader from './AuthHeader'
import Input from '../SharedComponents/Input'
import Button from '../SharedComponents/Button'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { RESEND_CODE, VERIFY_USER } from '../../graphql/auth'

const VerifyEmail = () => {

    const history = useHistory()

    const dispatch = useDispatch()

    const [ code, setCode ] = useState("")
    const [ error, setError ] = useState(null)

    useEffect(() => {
        if(!localStorage.getItem('email')) {
            history.replace('/register')
        }
    }, [])

    const [verifyUser] = useMutation(VERIFY_USER, {
        update(proxy, result) {
            localStorage.removeItem('email')
            setCode(null)
            dispatch({ type: "LOGIN", payload: {user : result.data.verifyUser} })
            history.push('/')
        },
        variables: {
            email: localStorage.getItem('email'), code
        },
        onError(err) {
            setError(err.graphQLErrors[0].message.split(': ')[1]);
        }
    })

    const [resendCode] = useMutation(RESEND_CODE, {
        update(proxy, result) {
            setCode(null)
        },
        variables: {
            email: localStorage.getItem('email')
        },
    })

    const handleSubmit = (e) => {
        setCode(null)
        e.preventDefault()
        if (code === "") {
            return
        }
        verifyUser()
    }

    return (
        <div className="bg-white min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">

                <AuthHeader
                    headerText="Check your email for a code"
                />

                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <Input
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            label="Verification Code"
                            id="verificationCode"
                            name="verificationCode"
                            type="number"
                            placeholder="Email verification code"
                        />
                        
                        {error && <p>{error}</p>}
                    </div>


                    <Button buttonText="Verify">
                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </Button>

                    <p>No email received? <span className="cursor-pointer" onClick={resendCode}>Resend Code</span> </p>

                </form>
            </div>
        </div>
    )
}

export default VerifyEmail