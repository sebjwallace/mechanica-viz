import React from 'react'

import MachineView from './MachineView'
import RegistryView from './RegistryView'

export default ({ send, root }) => {

  const { selectedTab } = root.AppTabs.data

  const views = {
    registry: <RegistryView />,
    machine: <MachineView />,
    tree: <div>tree</div>
  }

  return <div>
    { views[selectedTab] }
  </div>

}