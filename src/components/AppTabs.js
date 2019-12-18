import React from 'react'

import './AppTabs.scss'

export default () => {

  const tabs = [
    {
      label: 'Machine'
    },
    {
      label: 'Registry'
    },
    {
      label: 'Architecture'
    }
  ]

  return <div className="AppTabs">
    {
      tabs.map(({ label }) => <div className="tab">
        { label }
      </div>)
    }
  </div>

}