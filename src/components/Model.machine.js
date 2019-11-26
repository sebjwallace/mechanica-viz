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
      {
        event: 'flip',
        source: 'off',
        target: 'on',
        view: {
          source: {
            ratioX: 1,
            ratioY: 0.2
          },
          target: {
            ratioX: 0,
            ratioY: 0.2
          },
          points: [
            { x: 50, y: 25 },
            { x: 100, y: 25 }
          ]
        }
      }
    ]
  },
  states: [],
  transitions: [],
  subscriptions: [
    {
      event: 'updateModel',
      method: 'update'
    }
  ],
  methods: {
    update({ data, payload }){
      console.log('updated model')
      data = payload || data
      return {
        data,
        send: {
          event: 'updatedModel',
          payload: data
        }
      }
    }
  }
})