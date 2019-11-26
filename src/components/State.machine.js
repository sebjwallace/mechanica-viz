import r from 'rithmic'

export default r.register({
  id: 'state',
  states: [
    {
      id: 'idle',
      initial: true
    },
    {
      id: 'selected.idle'
    },
    {
      id: 'selected.move'
    }
  ],
  transitions: [
    {
      event: 'stateMouseDown',
      source: 'idle',
      target: 'selected.move'
    },
    {
      event: 'mouseMove',
      source: 'selected.move',
      target: 'selected.move',
      method: 'move'
    },
    {
      event: 'mouseUp',
      source: 'selected.move',
      target: 'selected.idle'
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
    move({ data, payload }){
      const { movementX, movementY } = payload
      const state = data.model.states.find(({ id }) => data.id === id)
      state.view.x += movementX
      state.view.y += movementY
      return {
        send: {
          event: 'updateModel',
          payload: data.model
        }
      }
    }
  }
})