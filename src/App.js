import React from 'react'
import r from 'rithmic'

import './components/App.machine'
import './components/Canvas.machine'
import './components/State.machine'
import './components/Transition.machine'
import './components/StateMachine.machine'
import './components/ToolPanel.machine'
import './components/PropsPanel.machine'
import './components/StateProps.machine'
import './components/TransitionProps.machine'
import './components/CreateStateModal.machine'
import './components/CreateTransitionModal.machine'
import './App.tree'

import Canvas from './components/Canvas'
import ToolPanel from './components/ToolPanel'
import PropsPanel from './components/PropsPanel'
import CreateStateModal from './components/CreateStateModal'
import CreateTransitionModal from './components/CreateTransitionModal'

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
        <PropsPanel { ...this.state.children.PropsPanel } />
        <CreateStateModal { ...this.state.children.CreateStateModal } />
        <CreateTransitionModal { ...this.state.children.CreateTransitionModal } />
      </div>
    )

  }

}

export default App;
