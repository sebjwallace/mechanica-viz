import rithmic from 'rithmic'

rithmic.test.run({
  id: 'state',
  tests: [
    {
      description: 'initial state',
      state: {
        'idle': true,
        'selected.idle': true
      }
    },
    {
      description: 'transition to move state',
      message: {
        event: 'stateMouseDown'
      },
      state: {
        'idle': true,
        'selected.move': true
      }
    }
  ]
})