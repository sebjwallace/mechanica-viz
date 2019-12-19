export default {
  id: 'Schema',
  states: [
    { id: 'default', initial: true }
  ],
  transitions: [],
  subscriptions: [
    {
      event: 'SCHEMA:CREATE_STATE',
      method: 'createState'
    },
    {
      event: 'SCHEMA:CREATE_TRANSITION',
      method: 'createTransition'
    },
    {
      event: 'SCHEMA:TRANSITION:SET_SOURCE',
      method: 'setTransitionSource'
    },
    {
      event: 'SCHEMA:TRANSITION:SET_TARGET',
      method: 'setTransitionTarget'
    }
  ],
  data: {
    id: '',
    states: [
      { id: 'default', initial: true }
    ],
    transitions: []
  },
  methods: {
    constructor({ data, payload }){
      data.id = payload.id
      return {
        data,
        send: {
          event: 'SCHEMA:CREATED',
          payload: { id: payload.id }
        }
      }
    },
    createState({ data, payload }){
      data.states.push({ id: payload.id })
      return { data }
    },
    createTransition({ data, payload }){
      if(data.id !== payload.id) return
      data.transitions.push({
        event: '',
        source: '',
        target: ''
      })
      return { data }
    },
    setTransitionSource({ data, payload }){
      if(data.id !== payload.id) return
      data.transitions[payload.index].source = payload.source
      return { data }
    },
    setTransitionTarget({ data, payload }){
      if(data.id !== payload.id) return
      data.transitions[payload.index].target = payload.target
      return { data }
    }
  }
}