import Rithmic from 'rithmic'

Rithmic.register({
  id: 'ContextMenu',
  data: {
    x: 0,
    y: 0
  },
  states: [
    { id: 'closed', initial: true },
    { id: 'open' }
  ],
  transitions: [
    {
      event: 'mouseDownRight',
      source: 'closed',
      target: 'open',
      method: 'open'
    },
    {
      event: 'mouseDown',
      source: 'open',
      target: 'closed'
    },
    {
      event: 'contextMenuCreateStateClick',
      source: 'open',
      target: 'closed',
      method: 'createState'
    }
  ],
  methods: {
    open({ data, payload }){
      const { nativeEvent: { offsetX: x, offsetY: y } } = payload
      data.x = x
      data.y = y
      return { data }
    },
    createState(){}
  }
})