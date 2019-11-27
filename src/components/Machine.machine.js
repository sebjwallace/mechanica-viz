import r from 'rithmic'

r.create({
  id: 'machine',
  data: {
    machine: null
  },
  states: [
    { id: 'idle', initial: true },
    { id: 'play' }
  ],
  transitions: [
    {
      event: 'startPlayer',
      source: 'idle',
      target: 'play',
      method: 'start'
    },
    {
      event: 'playerEvent',
      source: 'play',
      target: 'play',
      method: 'receiveEvent'
    },
    {
      event: 'stopPlayer',
      source: 'play',
      target: 'idle',
      method: 'stop'
    }
  ],
  subscriptions: [
    {
      event: 'updatedModel',
      method: 'update'
    }
  ],
  methods: {
    update({ data, payload }){
      data.model = payload
      return {
        data
      }
    },
    start({ data, payload }){
      data.machine = r.create({ ...data.model.schema })
      const intitalState = data.model.schema.states.find(({ id }) => id === data.machine.state.id)
      intitalState.view.active = true
      return {
        data,
        send: {
          event: 'updateModel',
          payload: data.model
        }
      }
    },
    stop({ data }){
      data.machine = null
      return {
        data
      }
    },
    receiveEvent({ data, payload }){
      data.machine.receive(payload)
      const { id: stateId } = data.machine.state
      data.model.schema.states = data.model.schema.states.map(state => ({
        ...state,
        view: {
          ...state.view,
          active: state.id === stateId
        }
      }))
      return {
        send: {
          event: 'updateModel',
          payload: data.model
        }
      }
    }
  }
})