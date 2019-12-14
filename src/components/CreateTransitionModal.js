import React from 'react'


export default ({ send, state, data }) => {

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
          event: 'PATCH:create-transition-modal/event',
          payload: { event: e.target.value }
        })}
      />
    </label>
    <button
      onClick={() => send({
        event: 'CMD:create-transition-modal/hide'
      })}
    >
      Create
    </button>
    <button
      onClick={() => send({
        event: 'CMD:create-transition-modal/hide'
      })}
    >
      Cancel
    </button>
  </div>

}