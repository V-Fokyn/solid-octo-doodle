import React, {useState, useEffect} from 'react'

import {UserContext} from '../contexts/UserContext'

import LogIn from './LogIn'
import Balances from './Balances'

import './App.css'

export default function App() {

  const [user, setUser] = useState()

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <UserContext.Provider value={{user, setUser}}>

      <div className="wrapper">
        {!user && <LogIn />}
        {user && user.token && <Balances />}
      </div>

    </UserContext.Provider>
  )

}