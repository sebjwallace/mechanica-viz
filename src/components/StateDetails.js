import React from 'react'
import Rithmic from 'rithmic'

import InputButton from './InputButton'

export default ({ schemaId, states }) => {

  const send = stateId => Rithmic.send({
    event: 'SCHEMA:CREATE_STATE',
    payload: { id: schemaId, stateId }
  })

  return <div className="StateDetails">
    <div className="tools">
      <InputButton
        buttonText="Create State"
        placeholder="state id"
        onClick={value => send(value)}
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
          <th>Actions</th>
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
            <td>
              <button
                onClick={() => Rithmic.send({
                  event: 'SCHEMA:STATE:DELETE',
                  payload: { id: schemaId, stateId: id }
                })}
              >
                Delete
              </button>
            </td>
          </tr>)
        }
      </tbody>
    </table>
  </div>

}