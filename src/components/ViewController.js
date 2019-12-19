import React from 'react'

import MachineView from './MachineView'
import RegistryView from './RegistryView'

export default ({ send, root }) => {

  const { selectedTab } = root.AppTabs.data

  const views = {
    machine: <MachineView />,
    registry: <RegistryView />,
    tree: <div>tree</div>
  }

  return <div>
    { views[selectedTab] }
  </div>

}