import r from 'rithmic'

r.create({
  id: 'model',
  data: {
    id: 'test',
    schema: {
      id: 'test',
      states: [],
      transitions: [],
      methods: {}
    }
  },
  states: [
    {
      id: 'idle',
      initial: true
    },
    {
      id: 'drawTransition'
    }
  ],
  transitions: [
    {
      event: 'interfaceMouseDown',
      source: 'idle',
      target: 'drawTransition',
      method: 'createTransition'
    },
    {
      event: 'esc',
      source: 'drawTransition',
      target: 'idle',
      method: 'deleteTransition'
    },
    {
      event: 'interfaceMouseDown',
      source: 'drawTransition',
      target: 'idle',
      method: 'closeTransition'
    }
  ],
  subscriptions: [
    {
      event: 'updateModel',
      method: 'update'
    },
    {
      event: 'createState',
      method: 'createState'
    }
  ],
  methods: {
    update({ data, payload }){
      data = payload || data
      return {
        data,
        send: {
          event: 'updatedModel',
          payload: data
        }
      }
    },
    createState({ data }){
      const state = {
        id: '',
        initial: !data.schema.states.length,
        view: {
          x: 0,
          y: 0,
          width: 50,
          height: 50
        }
      }
      data.schema.states.push(state)
      return {
        data,
        send: {
          event: 'updatedModel',
          payload: data
        }
      }
    },
    createTransition({ data, payload: { nativeEvent, stateIndex } }){
      const state = data.schema.states[stateIndex]
      const { offsetX: x, offsetY: y } = nativeEvent
      const ratioX = (x - state.view.x) / state.view.width
      const ratioY = (y - state.view.y) / state.view.height
      const transition = {
        event: '',
        source: state.id,
        target: '',
        view: {
          source: {
            index: stateIndex,
            ratioX,
            ratioY,
          },
          points: [
            { x, y },
            { x, y }
          ]
        }
      }
      data.schema.transitions.push(transition)
      return {
        data,
        send: { event: 'updatedModel', payload: data }
      }
    },
    deleteTransition({ data }){
      data.schema.transitions.pop()
      return {
        data,
        send: {
          event: 'updatedModel',
          payload: data
        }
      }
    },
    closeTransition({ data, payload: { nativeEvent, stateIndex } }){
      const transition = data.schema.transitions[data.schema.transitions.length - 1]
      const state = data.schema.states[stateIndex]
      transition.target = state.id
      const { offsetX: x, offsetY: y } = nativeEvent
      const ratioX = (x - state.view.x) / state.view.width
      const ratioY = (y - state.view.y) / state.view.height
      transition.view.target = {
        index: stateIndex,
        ratioX,
        ratioY
      }
      return {
        send: [
          { event: 'closedEdge' },
          {
            event: 'updatedModel',
            payload: data
          }
        ]
      }
    }
  }
})