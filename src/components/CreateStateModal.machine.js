import rithmic from 'rithmic'

rithmic.register({
  id: 'CreateStateModal',
  data: {
    stateId: ''
  },
  states: [
    {
      id: 'hidden',
      initial: true
    },
    {
      id: 'visible'
    },
    {
      id: 'submit.disabled',
      initial: true
    },
    {
      id: 'submit.enabled',
      entry: 'patch'
    }
  ],
  transitions: [
    {
      event: 'CMD:create-state-modal/show',
      source: 'hidden',
      target: 'visible'
    },
    {
      event: 'CMD:create-state-modal/hide',
      source: 'visible',
      target: 'hidden',
      method: 'reset'
    },
    {
      event: 'CMD:create-state-modal/hide',
      source: 'submit.enabled',
      target: 'submit.disabled',
      method: 'reset'
    },
    {
      event: 'PATCH:create-state-modal/stateId',
      source: ['submit.disabled', 'submit.enabled'],
      target: [
        'isStateIdAllowed',
        'submit.enabled',
        'submit.disabled'
      ]
    }
  ],
  methods: {
    isStateIdAllowed({ payload: { stateId }, request }){
      const stateIds = request({ event: 'GET:states' })
      return !stateIds.find(({ id }) => id === stateId) && stateId
    },
    patch({ data, payload }){
      return {
        data: { ...data, ...payload }
      }
    },
    reset(){
      return {
        data: { stateId: '' }
      }
    }
  }
})