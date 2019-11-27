import r from 'rithmic'

export default r.register({
  id: 'propertiesPanel',
  data: {
    selectedState: null,
    selectedTransition: null
  },
  states: [
    { id: 'idle', initial: true },
    { id: 'editState' },
    { id: 'editTransition' }
  ],
  transitions: [
    {
      event: 'selectState',
      source: 'editState',
      target: 'editState',
      method: 'selectState'
    },
    {
      event: 'selectState',
      source: 'idle',
      target: 'editState',
      method: 'selectState'
    },
    {
      event: 'selectTransition',
      source: 'idle',
      target: 'editTransition',
      method: 'selectTransition'
    },
    {
      event: 'selectTransition',
      source: 'editTransition',
      target: 'editTransition',
      method: 'selectTransition'
    },
    {
      event: 'selectTransition',
      source: 'editState',
      target: 'editTransition',
      method: 'selectTransition'
    },
    {
      event: 'selectState',
      source: 'editTransition',
      target: 'editState',
      method: 'selectState'
    },
    {
      event: 'updateStateId',
      source: 'editState',
      target: 'editState',
      method: 'updateStateId'
    },
    {
      event: 'updateTransitionEvent',
      source: 'editTransition',
      target: 'editTransition',
      method: 'editTransitionEvent'
    }
  ],
  subscriptions: [
    {
      event: 'updatedModel',
      method: 'update'
    }
  ],
  methods: {
    constructor(){
      return {
        send: {
          event: 'updateModel'
        }
      }
    },
    update({ data, payload }){
      data.model = payload
      return {
        data
      }
    },
    selectState({ data, payload }){
      const state = data.model.schema.states[payload.index]
      data.selectedStateIndex = payload.index
      data.selectedState = state
      return {
        data
      }
    },
    selectTransition({ data, payload }){
      const transition = data.model.schema.transitions[payload.index]
      data.selectedTransitionIndex = payload.index
      data.selectedTransition = transition
      return {
        data
      }
    },
    updateStateId({ data, payload }){
      data.model.schema.transitions.forEach(transition => {
        if(transition.source === data.selectedState.id) transition.source = payload.id
        if(transition.target === data.selectedState.id) transition.target = payload.id
      })
      const state = data.model.schema.states[data.selectedStateIndex]
      state.id = payload.id
      return {
        send: {
          event: 'updateModel',
          payload: data.model
        }
      }
    },
    editTransitionEvent({ data, payload }){
      const transition = data.model.schema.transitions[data.selectedTransitionIndex]
      transition.event = payload.event
      return {
        send: {
          event: 'updateModel',
          payload: data.model
        }
      }
    }
  }
})