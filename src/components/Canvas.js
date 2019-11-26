import React, { useState, useEffect } from 'react'
import r from 'rithmic'

import StateMachine from './StateMachine.js'

class Canvas extends React.Component {

  constructor(props){
    super(props)
    this.controller = r.useMachine({ id: 'model' })
    this.controller.watch(() => this.setState({
      model: this.controller.data
    }))
    this.state = { model: this.controller.data }
  }

  render(){

    return <div
      tabIndex="0"
    >
      <svg
        width="500"
        height="500"
        onMouseMove={e => r.send({
          event: 'mouseMove',
          payload: e
        })}
        onMouseUp={e => r.send({
          event: 'mouseUp',
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