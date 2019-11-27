import React, { useState, useEffect } from 'react'
import r from 'rithmic'

import StateMachine from './StateMachine.js'

class Canvas extends React.Component {

  constructor(props){
    super(props)
    this.controller = r.useMachine({ id: 'model' })
    this.controller.watch(() => this.setState({
      model: this.controller.data.schema
    }))
    this.state = { model: this.controller.data.schema }
  }

  render(){

    return <div
      tabIndex="0"
      onKeyDown={(e) => {
        r.send(e.ctrlKey && {event: 'multiselectOn'})
        r.send(e.keyCode === 27 && {event: 'esc'})
      }}
      onKeyUp={(e) => {
        r.send({event: 'multiselectOff'})
      }}
    >
      <svg
        width="500"
        height="500"
        onMouseDown={e => r.send({
          event: 'mouseDown',
          payload: e
        })}
        onMouseUp={e => r.send({
          event: 'mouseUp',
          payload: e
        })}
        onMouseMove={e => r.send({
          event: 'mouseMove',
          payload: e
        })}
      >
        <StateMachine
          { ...this.state.model }
        />
      </svg>
    </div>

  }

}

export default Canvas