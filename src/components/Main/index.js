import React, { useEffect } from "react";
import Projects from "./Projects";
import Tasks from "./Tasks";
import Notes from "./Notes";
import Devs from "./Devs";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

const Main = ({ user }) => {

    const history = useHistory()
    
    const location = useLocation()
    
    
    useEffect(() => {
        if(!user) {
            history.replace("/")
        }
    }, [user])

    return (
        
        // <main className="p-3 overflow-auto">
        <main className={`${location.pathname.split('/')[1] === "tasks"  ? "overflow-hidden flex-1" : "overflow-auto"} p-3`}>
            <Switch>
                <Route path='/projects' render={(props) => (
                    <Projects {...props} />)}
                />
                <Route path='/tasks/:projectId' render={(props) => (
                    <Tasks {...props} />)}
                />
                <Route path='/notes/:projectId' render={(props) => (
                    <Notes {...props} />)}
                />
                <Route exact path='/devs/:devPage' render={(props) => (
                    <Devs {...props} />)}
                />
            </Switch>
        </main>

    );
}

export default Main