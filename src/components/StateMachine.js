import React from 'react'
import State from './State'
import Transition from './Transition'

export default ({ state, children: { states = [], transitions = [] } }) => {

  return <g>
    {
      states.map(state => <State { ...state } />)
    }
    {
      transitions.map(transition => <Transition { ...transition } />)
    }
  </g>

}