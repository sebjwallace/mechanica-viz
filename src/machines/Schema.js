export default {
  id: 'Schema',
  states: [
    { id: 'default', initial: true }
  ],
  transitions: [],
  subscriptions: [
    {
      event: 'SCHEMA:CREATE_STATE',
      method: 'createState',
      guard: 'isResponsible'
    },
    {
      event: 'SCHEMA:CREATE_TRANSITION',
      method: 'createTransition',
      guard: 'isResponsible'
    },
    {
      event: 'SCHEMA:TRANSITION:SET_SOURCE',
      method: 'setTransitionSource',
      guard: 'isResponsible'
    },
    {
      event: 'SCHEMA:TRANSITION:SET_TARGET',
      method: 'setTransitionTarget',
      guard: 'isResponsible'
    },
    {
      event: 'SCHEMA:SUBSCRIPTION:CREATE',
      method: 'createSubscription',
      guard: 'isResponsible'
    },
    {
      event: 'SCHEMA:METHOD:CREATE',
      method: 'createMethod',
      guard: 'isResponsible'
    },
    {
      event: 'SCHEMA:STATE:DELETE',
      method: 'deleteState',
      guard: 'isResponsible'
    },
    {
      event: 'SCHEMA:TRANSITION:SET_METHOD',
      method: 'setTransitionMethod',
      guard: 'isResponsible'
    },
    {
      event: 'SCHEMA:TRANSITION:SET_EVENT',
      method: 'setTransitionEvent',
      guard: 'isResponsible'
    }
  ],
  data: {
    id: '',
    states: [
      { id: 'on' },
      { id: 'off' },
      { id: 'idle' }
    ],
    transitions: [
      {
        event: 'SWITCH',
        source: 'on',
        target: 'off'
      },
      {
        event: 'SWITCH',
        source: 'off',
        target: 'on'
      },
      {
        event: 'TOGGLE',
        source: 'on',
        target: 'idle'
      },
      {
        event: 'TOGGLE',
        source: 'idle',
        target: 'off'
      }
    ],
    subscriptions: [],
    publications: [],
    methods: {}
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
    isResponsible({ data, payload }){
      return data.id === payload.id
    },
    createState({ data, payload }){
      data.states.push({ id: payload.stateId })
      return { data }
    },
    deleteState({ data, payload }){
      data.states = data.states.filter(({ id }) => id !== payload.stateId)
      return {
        data
      }
    },
    createTransition({ data }){
      data.transitions.push({
        event: '',
        source: '',
        target: ''
      })
      return { data }
    },
    setTransitionSource({ data, payload }){
      data.transitions[payload.index].source = payload.source
      return { data }
    },
    setTransitionTarget({ data, payload }){
      data.transitions[payload.index].target = payload.target
      return { data }
    },
    setTransitionMethod({ data, payload }){
      data.transitions[payload.index].method = payload.methodName
      return { data }
    },
    setTransitionEvent({ data, payload }){
      data.transitions[payload.index].event = payload.event
      return { data }
    },
    createSubscription({ data, payload }){
      const { event, method } = payload
      data.subscriptions.push({ event, method })
      return { data }
    },
    createMethod({ data, payload }){
      const { methodName } = payload
      data.methods[methodName] = () => {}
      return { data }
    }
  }
}