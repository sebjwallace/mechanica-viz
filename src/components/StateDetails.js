import React from 'react'
import Rithmic from 'rithmic'

import InputButton from './InputButton'

export default ({ states }) => {

  const send = schemaId => Rithmic.send({
    event: 'SCHEMA:CREATE_STATE',
    payload: { id: schemaId }
  })

  return <div className="StateDetails">
    <div className="tools">
      <InputButton
        buttonText="Create State"
        onClick={e => send(e.target.value)}
        onEnter={e => send(e.target.value)}
      />
    </div>
    <table>
      <tbody>
        <tr>
          <th>Id</th>
          <th>Initial</th>
          <th>Entry</th>
          <th>Exit</th>
        </tr>
        {
          states.map(({ id, initial, entry, exit }) => <tr>
            <td>{ id }</td>
            <td>
              <input
                type="checkbox"
                checked={ !!initial }
              />
            </td>
            <td>{ entry }</td>
            <td>{ exit }</td>
          </tr>)
        }
      </tbody>
    </table>
  </div>

}