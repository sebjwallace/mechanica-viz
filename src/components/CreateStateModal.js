import React from 'react'


export default ({ send, state, data }) => {

  if(state.hidden) return ''
  const isEnabled = state['submit.enabled']

  return <div>
    <h2>
      Create state
    </h2>
    <label>
      Id
      <input
        type="text"
        onChange={e => send({
          event: 'PATCH:create-state-modal/stateId',
          payload: { stateId: e.target.value }
        })}
      />
    </label>
    <button
      disabled={!isEnabled}
      onClick={() => send([
        {
          event: 'addState',
          payload: { id: data.stateId }
        },
        {
          event: 'CMD:create-state-modal/hide'
        }
      ])}
    >
      Create
    </button>
    <button
      onClick={() => send({
        event: 'CMD:create-state-modal/hide'
      })}
    >
      Cancel
    </button>
  </div>

}