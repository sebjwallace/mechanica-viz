import rithmic from 'rithmic'

rithmic.register({
  id: 'CreateTransitionModal',
  data: {
    event: ''
  },
  states: [
    {
      id: 'hidden',
      initial: true
    },
    {
      id: 'visible'
    }
  ],
  transitions: [
    {
      event: 'CREATED:transition',
      source: 'hidden',
      target: 'visible'
    },
    {
      event: 'CMD:create-transition-modal/hide',
      source: 'visible',
      target: 'hidden',
      method: 'reset'
    }
  ],
  subscriptions: [
    {
      event: 'PATCH:create-transition-modal/event',
      method: 'patch'
    }
  ],
  methods: {
    patch({ data, payload }){
      return {
        data: { ...data, ...payload }
      }
    },
    reset(){
      return {
        data: { event: '' }
      }
    }
  }
})