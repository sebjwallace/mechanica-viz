import React, { useState, useEffect } from 'react'
import r from 'rithmic'

const PropertiesPanel = ({}) => {

  const [ { controller, data }, setState ] = useState({})

  useEffect(() => {
    const controller = r.create('propertiesPanel')
    controller.watch(() => setState({ controller, data: controller.data }))
    setState({ controller })
  }, [])

  if(!data) return ''

  const { selectedState } = data

  return <div>
    {
      selectedState && <div>
        <label>
          Id
          <input
            type="text"
            value={selectedState.id}
            onChange={e => controller.receive({
              event: 'updateStateId',
              payload: { id: e.target.value }
            })}
          />
        </label>
      </div>
    }
  </div>

}

export default PropertiesPanel