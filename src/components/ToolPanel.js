import React from 'react'

export default ({ send }) => {

  return <div>
    <button onClick={() => send({ event: 'addState' })}>
      State
    </button>
  </div>

}