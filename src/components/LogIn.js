import React, {useEffect, useState, useContext} from 'react'
import { UserContext } from '../contexts/UserContext'

import './LogIn.css'

export default function LogIn() {

  const [inputs, setInputs] = useState()
  const userContext = useContext(UserContext)

  const handleChange = (e) => {
    e.persist()
    setInputs(prev => ({...prev, ...{
      [e.target.id]: e.target.value.trim()
    }}))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputs)
    })

    if(response.ok) {
      const user = await response.json()
      userContext.setUser(user)
    }

  }

  return (
    <form onSubmit={handleSubmit} className="form">

      <div className="input-group">
        <label htmlFor="username" className="label">Username</label>
        <input type="text" id="username" onChange={handleChange} className="input"></input>
      </div>

      <div className="input-group">
        <label htmlFor="password" className="label">Password</label>
        <input type="password" id="password" onChange={handleChange} className="input"></input>
      </div>

      <button type="submit" className="button">Log in</button>

    </form>
  )
}