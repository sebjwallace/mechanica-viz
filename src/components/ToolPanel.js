import React from 'react'

export default ({ send }) => {

  return <div>
    <button onClick={() => send({ event: 'CMD:create-state-modal/show' })}>
      State
    </button>
  </div>

}