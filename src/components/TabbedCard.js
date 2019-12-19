import React, { useState } from 'react'

import './TabbedCard.scss'

export default ({ tabs }) => {

  const [ { selectedTab }, setState ] = useState({ selectedTab: '' })
  const selectedContent = tabs.find(({ id }) => id === selectedTab) || tabs[0]

  return <div className="TabbedCard">
    <div className="tabs">
      {
        tabs.map(({ id, label }) => <div
          className="tab"
          style={{
            opacity: id === selectedTab ? 1 : 0.5
          }}
          onClick={() => setState({ selectedTab: id })}
        >
          { label }  
        </div>)
      }
    </div>
    <div className="content">
      {
        selectedContent.content
      }
    </div>
  </div>

}