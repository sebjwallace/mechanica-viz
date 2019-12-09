import React from 'react'
import StateMachine from './StateMachine'

export default ({ state, children: { stateMachine }, send }) => {

  return <div
    tabIndex="0"
    onKeyDown={(e) => send([
      e.keyCode === 27 && {event: 'esc'},
      e.keyCode === 46 && {event: 'del'}
    ])}
    onKeyUp={(e) => {
      send({event: 'multiselectOff'})
    }}
  >
    <svg
      width="500"
      height="500"
      onMouseDown={e => send({
        event: 'mouseDown',
        payload: e
      })}
      onMouseUp={e => send({
        event: 'mouseUp',
        payload: e
      })}
      onMouseMove={e => send({
        event: 'mouseMove',
        payload: e
      })}
    >
      <StateMachine { ...stateMachine } />
    </svg>
  </div>

}