import React, { useState } from 'react'
import AuthHeader from '../AuthHeader'
import Input from '../../SharedComponents/Input'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { FORGOT_PASSWORD_EMAIL } from '../../../graphql/auth'
import Button from '../../SharedComponents/Button'

const Email = () => {

    const history = useHistory()

    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)

    const [forgotPasswordEmail] = useMutation(FORGOT_PASSWORD_EMAIL, {
        update(proxy, result) {
            localStorage.setItem('email', result.data.forgotPasswordEmail.email)
            setEmail("")
            history.push('/forgotPasswordCode')
        },
        variables: {
            email
        },
        onError(err) {
            setError(err.graphQLErrors[0].message.split(': ')[1]);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === "") {
            return
        }
        forgotPasswordEmail()
    }

    return (
        <div className="bg-white min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">

                <AuthHeader
                    headerText="Forgot Password (Step 1/3)"
                />

                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <Input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            label="Enter your email address"
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email address"
                        />

                        {error && <p>{error}</p>}
                    </div>




                    <Button buttonText="Send Code">
                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </Button>

                </form>
            </div>
        </div>
    )
}

export default Email