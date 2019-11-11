function Machine(schema){

  this.schema = schema

  this.states = schema.states.reduce((accum, state) => ({
    ...accum,
    [state.id]: state
  }), {})

  this.transitions = schema.transitions.reduce((accum, transition) => ({
    ...accum,
    [transition.source + transition.event]: transition
  }), {})

  this.events = schema.transitions.reduce((accum, { source, event }) => ({
    ...accum,
    [source]: accum[source] ? [...accum[source], event] : [event]
  }), {})

  if(schema.messages){
    this.messages = schema.messages.reduce((accum, message) => ({
      ...accum,
      [message.id]: message
    }), {})
  }

  this.state = schema.states.find(({ initial }) => initial)
  this.data = { ...schema.data }

  this.input = function(event, payload){

    const transition = this.transitions[this.state.id+event]
    this.state = this.states[transition.target]

    if(this.state.send){
      this.output(schema.messages[this.state.send])
    }

    this.onChange({
      state: this.state,
      event,
      payload
    })

  }

  this.isCurrentState = function(stateId){
    return this.state.id === stateId
  }

  this.isEventAvailable = function(event){
    return Boolean(this.events[this.state.id].includes(event))
  }

  this.isMessageSent = function(messageId){
    const message = schema.messages[this.state.send]
    return message && message.id === messageId
  }

}

export default Machine