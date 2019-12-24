
export default {
  id: 'Node',
  states: [
    {
      id: "idle",
      initial: true
    },
    {
      id: "selected"
    },
    {
      id: "moving"
    }
  ],
  transitions: [
    {
      event: "NODE:MOUSE_DOWN",
      source: "idle",
      target: "selected",
      guard: 'isSelectable'
    },
    {
      event: "MOUSE_MOVE",
      source: "selected",
      target: "moving",
      method: 'move'
    },
    {
      event: "MOUSE_MOVE",
      source: "moving",
      target: "moving",
      method: 'move'
    },
    {
      event: "MOUSE_UP",
      source: "moving",
      target: "idle"
    }
  ],
  publications: [
    {
      id: 'nodeMoved',
      event: 'NODE:MOVED',
      payload: ({ data }) => data
    }
  ],
  data: {
    id: '',
    x: 0,
    y: 0
  },
  methods: {
    constructor({ data, payload }){
      data.id = payload.id
      data.schemaId = payload.schemaId
      return { data }
    },
    isSelectable({ data, payload }){
      return data.id === payload.id
    },
    move({ data, payload }){
      const { movementX: x, movementY: y } = payload
      data.x += x
      data.y += y
      return {
        data,
        publish: 'nodeMoved'
      }
    }
  }
}