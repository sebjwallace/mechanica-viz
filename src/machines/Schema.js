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
    },
    {
      event: 'SCHEMA:GET_EVENTS',
      method: 'getEvents'
    },
    {
      event: 'NODE:MOVED',
      method: 'updateView',
      guard: 'isResponsible'
    }
  ],
  data: {
    id: '',
    states: [],
    transitions: [],
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
      return data.id === payload.id || data.id === payload.schemaId
    },
    createState({ data, payload }){
      data.states.push({
        id: payload.stateId,
        view: { x: 0, y: 0 }
      })
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
    },
    updateView({ data, payload }){
      const state = data.states.find(({ id }) => id === payload.id)
      state.view.x = payload.x
      state.view.y = payload.y
      return { data }
    },
    getEvents({ data }){
      const events = data.transitions.map(({ event }) => event)
      return {
        response: events
      }
    }
  }
}