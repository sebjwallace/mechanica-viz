import r from 'rithmic'

r.register({
  id: 'schema',
  data: {
    schema: {
      id: 'test',
      states: [],
      transitions: []
    },
    selectedNode: null
  },
  states: [
    {
      id: 'idle',
      initial: true
    },
    {
      id: 'viewNode'
    }
  ],
  transitions: [
    {
      event: 'nodeMouseDown',
      source: 'idle',
      target: 'viewNode',
      method: 'selectNode'
    },
    {
      event: 'nodeMouseDown',
      source: 'viewNode',
      target: 'viewNode',
      method: 'selectNode'
    }
  ],
  subscriptions: [
    {
      event: 'createdNode',
      method: 'createState'
    },
    {
      event: 'closedEdge',
      method: 'createTransition'
    },
    {
      event: 'changeNodeId',
      method: 'changeNodeId'
    }
  ],
  methods: {
    createState({ data, payload }){
      data.schema.states.push({
        id: payload.id,
      })
      return {
        data
      }
    },
    createTransition({ data, payload }){
      data.schema.transitions.push({
        event: '',
        source: payload.source.id,
        target: payload.target.id
      })
      return {
        data
      }
    },
    selectNode({ data, payload }){
      console.log(payload)
      data.selectedNode = data.schema.states.find(({id}) => id === payload.id)
      return {
        data
      }
    },
    changeNodeId({ data, payload }){
      data.selectedNode.id = payload
      return {
        data
      }
    }
  }
})