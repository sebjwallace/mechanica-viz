import React, { useState } from 'react'
import Rithmic from 'rithmic'

import './EventInput.scss'

export default ({ value, onChange }) => {

  const events = {}
  const allEvents = Rithmic.request({ event: 'SCHEMA:GET_EVENTS' })
  allEvents.forEach(evts => evts.forEach(ev => { events[ev] = true }))

  const [ state, setState ] = useState({ input: value, popup: false })

  return <div className="EventInput">
    <input
      type="text"
      value={state.input}
      onFocus={() => setState({ ...state, popup: true })}
      onBlur={() => setState({ ...state, popup: false })}
      onChange={e => onChange(e.target.value) && setState({ ...state, input: e.target.value })}
    />
    {
      state.popup && <div className="dropdown">
        {
          Object.keys(events)
            .filter(event => event.toLowerCase().includes(state.input.toLowerCase()))
            .map(event => <div
              className="option"
              onMouseDown={() => onChange(event) && setState({ ...state, input: event, popup: false })}
            >
              { event }
            </div>)
        }
      </div>
    }
  </div>

}