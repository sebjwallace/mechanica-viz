import r from 'rithmic'

r.create({
  id: 'model',
  data: {
    id: 'test',
    states: [
      {
        id: 'off',
        view: {
          x: 0,
          y: 0,
          width: 50,
          height: 50
        },
        state: {
          selected: true
        }
      },
      {
        id: 'on',
        view: {
          x: 100,
          y: 0,
          width: 50,
          height: 50
        },
        state: {
          selected: false
        }
      }
    ],
    transitions: [
      // {
      //   event: 'flip',
      //   source: 'off',
      //   target: 'on',
      //   view: {
      //     source: {
      //       ratioX: 1,
      //       ratioY: 0.2
      //     },
      //     target: {
      //       ratioX: 0,
      //       ratioY: 0.2
      //     },
      //     points: [
      //       { x: 50, y: 25 },
      //       { x: 100, y: 25 }
      //     ]
      //   }
      // }
    ]
  },
  states: [
    {
      id: 'idle',
      initial: true
    },
    {
      id: 'drawTransition'
    }
  ],
  transitions: [
    {
      event: 'interfaceMouseDown',
      source: 'idle',
      target: 'drawTransition',
      method: 'createTransition'
    },
    {
      event: 'interfaceMouseDown',
      source: 'drawTransition',
      target: 'idle',
      method: 'closeTransition'
    }
  ],
  subscriptions: [
    {
      event: 'updateModel',
      method: 'update'
    }
  ],
  methods: {
    update({ data, payload }){
      data = payload || data
      return {
        data,
        send: {
          event: 'updatedModel',
          payload: data
        }
      }
    },
    createTransition({ data, payload: { nativeEvent, stateIndex } }){
      const state = data.states[stateIndex]
      const { offsetX: x, offsetY: y } = nativeEvent
      const ratioX = (x - state.view.x) / state.view.width
      const ratioY = (y - state.view.y) / state.view.height
      const transition = {
        event: '',
        source: '',
        target: '',
        view: {
          source: {
            index: stateIndex,
            ratioX,
            ratioY,
          },
          points: [
            { x, y },
            { x, y }
          ]
        }
      }
      data.transitions.push(transition)
      return {
        data,
        send: [
          // { event: 'createdEdge', payload: transition },
          { event: 'updatedModel', payload: data }
        ]
      }
    },
    closeTransition({ data, payload: { nativeEvent, stateIndex } }){
      const transition = data.transitions[data.transitions.length - 1]
      const state = data.states[stateIndex]
      const { offsetX: x, offsetY: y } = nativeEvent
      const ratioX = (x - state.view.x) / state.view.width
      const ratioY = (y - state.view.y) / state.view.height
      transition.view.target = {
        index: stateIndex,
        ratioX,
        ratioY
      }
      return {
        send: [
          { event: 'closedEdge' },
          {
            event: 'updatedModel',
            payload: data
          }
        ]
      }
    }
  }
})