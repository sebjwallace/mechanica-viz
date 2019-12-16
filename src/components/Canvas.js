import React from 'react'
import StateMachine from './StateMachine'
import ContextMenu from './ContextMenu'

import './Canvas.scss'

export default ({ state, children: { stateMachine, contextMenu }, send }) => {

  return <div
    className="Canvas"
    tabIndex="0"
    onKeyDown={(e) => send([
      e.keyCode === 27 && {event: 'esc'},
      e.keyCode === 46 && {event: 'del'},
      { event: 'keyDown', payload: e }
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
      onDoubleClick={e => send({
        event: 'addState',
        payload: e
      })}
      onContextMenu={e => send({
        event: 'mouseDownRight',
        payload: e
      }) && e.preventDefault()}
    >
      <StateMachine { ...stateMachine } />
    </svg>
    <div className="overlay">
      <ContextMenu { ...contextMenu } />
    </div>
  </div>

}