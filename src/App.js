import React from 'react'
import LeftMenu from './components/LeftMenu';
import Header from './components/Header'
import Main from './components/Main';
import { useDispatch, useSelector } from 'react-redux';
import Homepage from './components/Homepage';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';

import { FETCH_COLLEAGUES } from './graphql/dev';
import Subscriptions from './subscriptions';
// import { Offline, Online } from "react-detect-offline";


const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const { projectId } = useParams()

  const { data: colleaguesData } = useQuery(
    FETCH_COLLEAGUES,
    {
      onCompleted: () => {
        dispatch({ type: "FETCH_COLLEAGUES", payload: { colleagues: colleaguesData.colleagues } })
      }
    })


  return (
    <div className="h-screen flex overflow-hidden">
      <Subscriptions />
      {user && <LeftMenu />}
      <h1>Test Pull</h1>
      <div className="bg-white flex flex-col flex-1 min-w-0 flex-shrink-0">
        <Header user={user} />
        {user && <Main user={user} />}
        {/* <Offline><h1>Please check your network status</h1></Offline> */}
        <Homepage user={user} projectId={projectId} />
      </div>
    </div>
  );
}



export default App;
