import React, { useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import Email from '../Auth/ForgotPassword/Email'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import VerifyEmail from '../Auth/VerifyEmail'
import Home from './Home'
import Code from '../Auth/ForgotPassword/Code'
import NewPassword from '../Auth/ForgotPassword/NewPassword'

const Homepage = ({ user, projectId }) => {

    const history = useHistory()
    
    const location = useLocation()

    useEffect(() => {
        if(user && !(location.pathname.split('/')[1] === 'tasks') && !(location.pathname.split('/')[1] === 'devs') ) {
            history.replace("/projects")
        }
    }, [user])

    return (
        <main>
            <Switch>
                <Route exact path='/' render={(props) => (
                    <Home {...props} />)}
                />
                <Route path='/login' render={(props) => (
                    <Login {...props} />)}
                />
                <Route path='/register' render={(props) => (
                    <Register {...props} />)}
                />
                <Route path='/verification' render={(props) => (
                    <VerifyEmail {...props} />)}
                />
                <Route path='/forgotPassword' render={(props) => (
                    <Email {...props} />)}
                />
                <Route path='/forgotPasswordCode' render={(props) => (
                    <Code {...props} />)}
                />
                <Route path='/forgotPasswordNewPassword' render={(props) => (
                    <NewPassword {...props} />)}
                />
            </Switch>
        </main>
    )
}

export default Homepage