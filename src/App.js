import React from 'react'
import r from 'rithmic'

import './components/App.machine'
import './components/Graph.machine'
import './components/ToolPanel.machine'
import './components/PropertiesPanel.machine'
import './App.tree'

console.log(r.tree.createMachineTree('app'))
console.log(r.tree.createObjectTree())

class App extends React.Component {

  render(){

    window.r = r

    return (
      <div className="App">
      </div>
    )

  }

}

export default App;
