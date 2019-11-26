import React from 'react'
import r from 'rithmic'

import Attach from './Attach'

const PropertiesPanel = ({
  state,
  schema,
  selectedNode
}) => {

  return <div>
    {
      state.viewNode && <div>
        <label>
          id
          <input
            type="text"
            value={selectedNode.id}
            onChange={e => r.send({ event: 'changeNodeId', payload: e.target.value })}
          />
        </label>
      </div>
    }
  </div>

}

export default Attach(PropertiesPanel)