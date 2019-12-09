import r from 'rithmic'

export default r.register({
  id: 'stateMachine',
  data: {},
  states: [
    { id: 'idle', initial: true },
    { id: 'drawTransition' }
  ],
  transitions: [
    {
      event: 'interfaceMouseDown',
      source: 'idle',
      target: 'drawTransition',
      method: 'createTransition'
    },
    {
      event: 'interfaceMouseDown',
      source: 'drawTransition',
      target: 'idle'
    }
  ],
  subscriptions: [
    {
      event: 'addState',
      method: 'createState'
    }
  ],
  methods: {
    createState(){
      return {
        send: {
          event: 'createState'
        }
      }
    },
    createTransition({ payload }){
      const { nativeEvent: { offsetX, offsetY }, stateId, position } = payload
      return {
        send: {
          event: 'createTransition',
          payload: { x: offsetX, y: offsetY, stateId, position }
        }
      }
    }
  }
})