import React from 'react'

import './AppTabs.scss'

export default ({ root, send }) => {

  const { tabs, selectedTab } = root.AppTabs.data

  return <div className="AppTabs">
    {
      tabs.map(({ id, label }) => <div
        className="tab"
        style={{
          opacity: id === selectedTab ? 1 : 0.5
        }}
        onClick={() => send({
          event: 'APP_TABS:SELECT_TAB',
          payload: { tabId: id }
        })}
      >
        { label }
      </div>)
    }
  </div>

}