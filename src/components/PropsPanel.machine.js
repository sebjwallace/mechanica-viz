import r from 'rithmic'

r.register({
  id: 'PropsPanel',
  data: {},
  states: [
    { id: 'state.idle', initial: true },
    { id: 'state.display' },
    { id: 'transition.idle', initial: true },
    { id: 'transition.display' }
  ],
  transitions: [
    {
      event: 'UPDATED:state',
      source: 'state.idle',
      target: 'state.display'
    },
    {
      event: 'CMD:props-panel/reset',
      source: 'state.display',
      target: 'state.idle'
    },
    {
      event: 'PATCH:transition/mouse-up',
      source: 'transition.idle',
      target: 'transition.display'
    },
    {
      event: 'CMD:props-panel/reset',
      source: 'transition.display',
      target: 'transition.idle'
    }
  ]
})