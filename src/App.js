import React from 'react'
import r from 'rithmic'

import './components/State.machine'
import './components/Model.machine'

import Canvas from './components/Canvas'

class App extends React.Component {

  render(){

    window.r = r

    return (
      <div className="App">
        <Canvas />
      </div>
    )

  }

}

export default App;
