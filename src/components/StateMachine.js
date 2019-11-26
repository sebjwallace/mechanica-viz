import React from 'react'

import State from './State'
import Transition from './Transition'

const StateMachine = ({
  states,
  transitions
}) => {
  
  return <g>
    {
      states.map(state => <State { ...state } />)
    }
    {
      transitions.map(transition => <Transition { ...transition } />)
    }
  </g>

}

export default StateMachine