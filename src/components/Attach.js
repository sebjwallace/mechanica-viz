import React from 'react'
import r from 'rithmic'

export default (Component) => {

  return class Attach extends React.Component {

    constructor(props){
      super(props)
      if(this.props.id){
        this.machine = r.useMachine({
          id: this.props.id,
          ref: this.props.id
        })
      }
      else if(this.props.create){
        this.machine = r.create(this.props.create)
      }
      this.state = this.machine.data
      this.machine.watch(() => {
        this.setState({ ...this.machine.data })
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