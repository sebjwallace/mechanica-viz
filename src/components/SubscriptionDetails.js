import React, { useState } from 'react'
import Rithmic from 'rithmic'

import './SubscriptionDetails.scss'

export default ({ schemaId, subscriptions = [], methods = {} }) => {

  const methodNames = Object.keys(methods)
  const [ state, setState ] = useState({ selectedMethod: methodNames[0], event: '' })
  const { selectedMethod, event } = state

  const send = () => Rithmic.send({
    event: 'SCHEMA:SUBSCRIPTION:CREATE',
    payload: { id: schemaId, method: selectedMethod, event }
  })

  return <div className="SubscriptionDetails">
    <div className="tools">
      <input
        placeholder="event"
        onChange={e => setState({
          ...state,
          event: e.target.value
        })}
      />
      <select onChange={e => setState({
        ...state,
        selectedMethod: e.target.value
      })}>
        {
          methodNames.map(methodName => <option>
            { methodName }
          </option>)
        }
      </select>
      <button onClick={send}>
        Create Subscription
      </button>
    </div>
    <table>
      <tbody>
        <tr>
          <th>Event</th>
          <th>Method</th>
        </tr>
        {
          subscriptions.map(({ event, method }) => <tr>
            <td>{ event }</td>
            <td>{ method }</td>
          </tr>)
        }
      </tbody>
    </table>
  </div>

}