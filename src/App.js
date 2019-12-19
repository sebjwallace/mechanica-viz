import React from 'react'
import Rithmic from 'rithmic'

import { tree } from './setup'

import AppTabs from './components/AppTabs'
import AppSection from './components/AppSection'
import ViewController from './components/ViewController'
class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      ...tree.createObjectTree()
    }
    Rithmic.watch(() => {
      this.setState({
        ...tree.createObjectTree()
      })
    })
  }

  render(){

    const root = { send: this.state.send, root: this.state.children }

    return (
      <div className="App">
        <AppTabs { ...root } />
        <div style={{ display: 'flex', height: 'calc(100% - 35px)', width: 'calc(100% - 2px)' }}>
          <AppSection
            width="70%"
          >
            <ViewController { ...root } />
          </AppSection>
          <div style={{ width: '30%' }}>
            <AppSection
              height="50%"
              left="2px"
              bottom="2px"
            />
            <AppSection
              height="50%"
              left="2px"
            />
          </div>
        </div>
      </div>
    )

  }

}

export default App;
