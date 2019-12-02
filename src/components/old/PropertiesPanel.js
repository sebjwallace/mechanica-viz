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

  const { selectedState, selectedTransition } = data
  const state = controller.getStates()

  return <div>
    {
      state.editState && <div>
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
    {
      state.editTransition && <div>
        <label>
          Event
          <input
            type="text"
            value={selectedTransition.event}
            onChange={e => controller.receive({
              event: 'updateTransitionEvent',
              payload: { event: e.target.value }
            })}
          />
        </label>
      </div>
    }
  </div>

}

export default PropertiesPanel