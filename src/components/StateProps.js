import React from 'react'

export default ({ send, data, children }) => {

  const { selectedState: { id, view: { x, y, width, height } } } = data

  const event = 'PATCH:state'

  return <div>
    <label>
      Id
      <input
        type="text"
        value={id}
        onChange={({ target }) => send({
          event,
          payload: { id: target.value }
        })}
      />
    </label>
    <label>
      x
      <input
        type="text"
        value={x}
        onChange={({ target }) => send({
          event,
          payload: { x: target.value }
        })}
      />
    </label>
    <label>
      y
      <input
        type="text"
        value={y}
        onChange={({ target }) => send({
          event,
          payload: { y: target.value }
        })}
      />
    </label>
    <label>
      Width
      <input
        type="text"
        value={width}
        onChange={({ target }) => send({
          event,
          payload: { width: target.value }
        })}
      />
    </label>
    <label>
      Height
      <input
        type="text"
        value={height}
        onChange={({ target }) => send({
          event,
          payload: { height: target.value }
        })}
      />
    </label>
  </div>

}