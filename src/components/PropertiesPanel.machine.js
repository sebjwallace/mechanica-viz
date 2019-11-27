import r from 'rithmic'

export default r.register({
  id: 'propertiesPanel',
  data: {
    selectedState: null
  },
  states: [
    { id: 'idle', initial: true }
  ],
  transitions: [
    {
      event: 'updateStateId',
      source: 'idle',
      target: 'idle',
      method: 'updateStateId'
    }
  ],
  subscriptions: [
    {
      event: 'updatedModel',
      method: 'update'
    },
    {
      event: 'selectState',
      method: 'selectState'
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
    updateStateId({ data, payload }){
      const state = data.model.schema.states[data.selectedStateIndex]
      state.id = payload.id
      return {
        send: {
          event: 'updateModel',
          payload: data.model
        }
      }
    }
  }
})