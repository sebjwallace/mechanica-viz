import r from 'rithmic'

r.register({
  id: 'app',
  data: {},
  states: [
    { id: 'idle', initial: true }
  ],
  transitions: [],
  methods: {
    constructor(){
      return {
        send: {
          event: 'createGraph',
          payload: { message: 'created graph' }
        }
      }
    }
  }
})