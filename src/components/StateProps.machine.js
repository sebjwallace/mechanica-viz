import r from 'rithmic'

r.register({
  id: 'StateProps',
  data: {
    selectedState: null
  },
  states: [
    { id: 'idle', initial: true }
  ],
  transitions: [
    {
      event: 'UPDATED:state',
      source: 'idle',
      target: 'idle',
      method: 'update'
    }
  ],
  methods: {
    update({ data, payload }){
      data.selectedState = payload
      return {
        data
      }
    }
  }
})