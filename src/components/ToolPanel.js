import React from 'react'
import r from 'rithmic'

const ToolPanel = ({}) => {

  return <div className="ToolPanel">
    <button
      onClick={e => r.send({event: 'createState'})}
    >
      N
    </button>
    <button
      onClick={e => r.send({event: 'startPlayer'})}
    >
      Start
    </button>
    <button
      onClick={e => r.send({event: 'stopPlayer'})}
    >
      Stop
    </button>
  </div>

}

export default ToolPanel