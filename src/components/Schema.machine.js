import r from 'rithmic'

r.create({
  id: 'schema',
  data: {
    id: 'test',
    states: [],
    transitions: []
  },
  states: [],
  transitions: [],
  subscriptions: [
    {
      event: 'createdNode',
      method: 'createState'
    },
    {
      event: 'closedEdge',
      method: 'createTransition'
    }
  ],
  methods: {
    createState({ data, payload }){
      data.states.push({
        id: payload.id,
      })
      return {
        data
      }
    },
    createTransition({ data, payload }){
      data.transitions.push({
        event: '',
        source: payload.source.id,
        target: payload.target.id
      })
      console.log(data)
      return {
        data
      }
    }
  }
})