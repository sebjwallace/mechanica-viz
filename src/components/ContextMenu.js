import React from 'react'

import './ContextMenu.scss'

export default ({ state, data: { x, y } }) => {

  if(state.closed) return ''

  return <div
    className="ContextMenu"
    style={{
      left: x,
      top: y
    }}
  >
    menu
  </div>

}