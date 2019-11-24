import React from 'react'
import r from 'rithmic'

export default (Component) => {

  return class Attach extends React.Component {

    constructor(props){
      super(props)
      if(props.id){
        this.machine = r.useMachine({
          id: props.id,
          tag: props.id
        })
      }
      else if(props.create){
        this.machine = r.create(props.create)
      }
      this.state = {
        ...this.machine.data,
        state: this.machine.getStates()
      }
      this.machine.watch(() => {
        this.setState({
          ...this.machine.data,
          state: this.machine.getStates()
        })
        console.log(this.machine.state)
      })
    }

    componentWillUnmount(){
      r.removeMachine(this.machine)
    }

    render(){

      return <Component { ...this.state } />

    }

  }

}