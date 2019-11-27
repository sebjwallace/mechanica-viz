import React from 'react'
import r from 'rithmic'

const ToolPanel = ({}) => {

  return <div className="ToolPanel">
    <button
      onClick={e => r.send({event: 'createState'})}
    >
      N
    </button>
  </div>

}

export default ToolPanel