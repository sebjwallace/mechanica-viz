import React from 'react'

import './Props.scss'

export default ({ send, data, children }) => {

  const { selectedState: { id } } = data

  return <div className="Props">
    <label className="labeled-input">
      Id
      <input
        type="text"
        value={id}
        onChange={({ target }) => send({
          event: 'stateChangeId',
          payload: {
            prevId: id,
            id: target.value
          }
        })}
      />
    </label>
  </div>

}