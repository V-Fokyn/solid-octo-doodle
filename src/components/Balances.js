import React, {useEffect, useState, useContext} from 'react'

import { UserContext } from '../contexts/UserContext'

import './Balances.css'

export default function Balances() {

  const [balances, setBalances] = useState([])
  const userContext = useContext(UserContext)
  const [balancesElements, setBalancesElements] = useState([])

  useEffect(async() => {
    console.log(userContext.token)
  
    if(userContext.user && userContext.user.token) {
      console.log('requesting balances:')
      console.log(userContext.user.token)

      const response = await fetch('http://localhost:3000/user/balances', {
        headers: {
          'Authorization': `Bearer ${userContext.user.token}`
        }
      })
  
      if(response.ok) {
        const balances = await response.json()
        console.log(balances)
        setBalances(balances)
      }
    }
      
  }, [userContext.user])

  useEffect(() => {
    if(balances.length > 0)
      setBalancesElements(balances.map(bal => {
        return (
        <tr key={bal.currency}>
          <td>{bal.currency}</td>
          <td>{bal.amount}</td>
        </tr>
        )
      }))
  }, [balances])

  return (
    <div>
      <h1>Balances</h1>
      <table className="balances-table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {balancesElements}
        </tbody>
      </table>
    </div>
  )
}