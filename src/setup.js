import Rithmic from 'rithmic'

import App from './machines/App'
import AppTabs from './machines/AppTabs'
import Registry from './machines/Registry'
import Schema from './machines/Schema'
import Node from './machines/Node'
import AppTree from './App.tree'

Rithmic.register(App)
Rithmic.register(AppTabs)
Rithmic.register(Registry)
Rithmic.register(Schema)
Rithmic.register(Node)
Rithmic.tree.register(AppTree)

Rithmic.tree.createMachineTree('app')

window.r = Rithmic

export const tree = Rithmic.tree