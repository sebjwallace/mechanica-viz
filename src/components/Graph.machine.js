import r from 'rithmic'

r.register({
  id: 'graph',
  data: {
    states: [],
    transitions: []
  },
  states: [
    { id: 'idle', initial: true }
  ],
  transitions: [],
  methods: {
    constructor({ payload }){
      console.log(payload)
    }
  }
})