import React from 'react'
import r from 'rithmic'

import './components/App.machine'
import './components/Canvas.machine'
import './components/State.machine'
import './components/Transition.machine'
import './components/StateMachine.machine'
import './components/ToolPanel.machine'
import './components/PropertiesPanel.machine'
import './App.tree'

import Canvas from './components/Canvas'
import ToolPanel from './components/ToolPanel'

console.log(r.tree.createMachineTree('app'))
console.log(r.tree.createObjectTree())
window.r = r

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      ...r.tree.createObjectTree()
    }
    r.watch(() => {
      this.setState({
        ...r.tree.createObjectTree()
      })
    })
  }

  render(){

    return (
      <div className="App">
        <ToolPanel { ...this.state.children.toolPanel } />
        <Canvas { ...this.state.children.canvas } />
      </div>
    )

  }

}

export default App;
