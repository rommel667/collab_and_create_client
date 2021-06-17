import React, { useState } from 'react'
import AuthHeader from '../AuthHeader'
import Input from '../../SharedComponents/Input'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { FORGOT_PASSWORD_CODE } from '../../../graphql/auth'
import Button from '../../SharedComponents/Button'

const Code = () => {

    const history = useHistory()

    const [code, setCode] = useState("")
    const [error, setError] = useState(null)

    const [forgotPasswordCode] = useMutation(FORGOT_PASSWORD_CODE, {
        update(proxy, result) {
            setCode(null)
            if(result.data.forgotPasswordCode) {
                history.push('/forgotPasswordNewPassword')
            }
        },
        variables: {
            email: localStorage.getItem('email'), code
        },
        onError(err) {
            setError(err.graphQLErrors[0].message.split(': ')[1]);
        }
    })

    const handleSubmit = (e) => {
        setCode(null)
        e.preventDefault()
        if (code === "") {
            return
        }
        forgotPasswordCode()
    }

    return (
        <div className="bg-white min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">

                <AuthHeader
                    headerText="Forgot Password (Step 2/3)"
                />

                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
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


                    </div>




                    <Button buttonText="Confirm">
                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </Button>

                </form>
            </div>
        </div>
    )
}

export default Code