import React from 'react'
import r from 'rithmic'

import './components/State.machine'
import './components/Transition.machine'
import './components/Model.machine'
import './components/PropertiesPanel.machine'
import './components/Machine.machine'

import Canvas from './components/Canvas'
import ToolPanel from './components/ToolPanel'
import PropertiesPanel from './components/PropertiesPanel'

class App extends React.Component {

  render(){

    window.r = r

    return (
      <div className="App">
        <ToolPanel />
        <Canvas />
        <PropertiesPanel />
      </div>
    )

  }

}

export default App;
