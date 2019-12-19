import Rithmic from 'rithmic'

import App from './machines/App'
import AppTabs from './machines/AppTabs'
import Registry from './machines/Registry'
import Schema from './machines/Schema'
import AppTree from './App.tree'

Rithmic.register(App)
Rithmic.register(AppTabs)
Rithmic.register(Registry)
Rithmic.register(Schema)
Rithmic.tree.register(AppTree)

Rithmic.tree.createMachineTree('app')

window.r = Rithmic

export const tree = Rithmic.tree