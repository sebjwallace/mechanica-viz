import rithmic from 'rithmic'

rithmic.register({
  id: 'CreateTransitionModal',
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
  ]
})