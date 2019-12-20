import React from 'react'
import Rithmic from 'rithmic'

import InputButton from './InputButton'

export default ({ schemaId, methods = {} }) => {

  const methodNames = Object.keys(methods)

  const send = methodName => Rithmic.send({
    event: 'SCHEMA:METHOD:CREATE',
    payload: { id: schemaId, methodName }
  })

  return <div className="MethodDetails">
    <div className="tools">
      <InputButton
        buttonText="Create Method"
        placeholder="method name"
        onClick={e => send(e.target.value)}
        onEnter={e => send(e.target.value)}
      />
    </div>
    <table>
      <tbody>
        <tr>
          <th>Name</th>
        </tr>
        {
          methodNames.map((methodName) => <tr>
            <td>{ methodName }</td>
          </tr>)
        }
      </tbody>
    </table>
  </div>

}