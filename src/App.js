import React from 'react'
import Graph from './components/Graph'

import './components/Graph.machine'
import './components/Node.machine'
import './components/Edge.machine'

class App extends React.Component {

  render(){

    return (
      <div className="App">
        <Graph create="graph"/>
      </div>
    )

  }

}

export default App;
