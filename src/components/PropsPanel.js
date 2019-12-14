import React from 'react'

import StateProps from './StateProps'
import TransitionProps from './TransitionProps'

export default ({ state, children }) => {

  return <div>
    { state['state.display'] && <StateProps { ...children.StateProps } /> }
    { state['transition.display'] && <TransitionProps { ...children.TransitionProps } /> }
  </div>

}