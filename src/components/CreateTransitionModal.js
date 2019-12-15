import React from 'react'


export default ({ send, state }) => {

  if(state.hidden) return ''

  return <div>
    <h2>
      Create Transition
    </h2>
    <label>
      Event
      <input
        type="text"
        onChange={e => send({
          event: 'PATCH:transition',
          payload: { event: e.target.value }
        })}
      />
    </label>
    <button
      onClick={() => send({
        event: 'CMD:create-transition-modal/hide'
      })}
    >
      Done
    </button>
  </div>

}