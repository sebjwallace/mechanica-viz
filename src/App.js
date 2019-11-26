import React from 'react'
import r from 'rithmic'

import Graph from './components/Graph'
import ToolPanel from './components/ToolPanel'

import './components/Graph.machine'
import './components/Node.machine'
import './components/Edge.machine'
import './components/Schema.machine'

class App extends React.Component {

  render(){

    window.r = r

    return (
      <div className="App">
        <ToolPanel />
        <Graph create="graph"/>
      </div>
    )

  }

}

export default App;
