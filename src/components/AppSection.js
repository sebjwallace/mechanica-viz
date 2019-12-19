import React from 'react'

import './AppSection.scss'

export default ({
  children,
  width = '100%',
  height = '100%',
  left = '0',
  bottom = '0'
}) => {

  return <div
    className="AppSection"
    style={{
      width,
      height,
      paddingLeft: left,
      paddingBottom: bottom
    }}
  >
    <div className="header">

    </div>
    <div className="body">
      { children }
    </div>
  </div>

}