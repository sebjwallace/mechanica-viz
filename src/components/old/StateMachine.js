import React from 'react'

import State from './State'
import Transition from './Transition'

const StateMachine = ({
  states,
  transitions
}) => {
  
  return <g>
    {
      states.map((state, i) => <State { ...state } index={i} />)
    }
    {
      transitions.map((transition, i) => <Transition { ...transition } id={i} />)
    }
  </g>

}

export default StateMachine