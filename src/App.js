import React from 'react'
import Rithmic from 'rithmic'

import { tree } from './setup'

import AppTabs from './components/AppTabs'
import AppSection from './components/AppSection'
class App extends React.Component {

  constructor(props){
    super(props)
    // this.state = {
    //   ...tree.createObjectTree()
    // }
    // Rithmic.watch(() => {
    //   this.setState({
    //     ...tree.createObjectTree()
    //   })
    // })
  }

  render(){

    return (
      <div className="App">
        <AppTabs />
        <div style={{ display: 'flex', height: '100%' }}>
          <AppSection
            width="70%"
          />
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
