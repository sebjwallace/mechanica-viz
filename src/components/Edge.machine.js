import r from 'rithmic'

const schema = {
  id: 'edge',
  states: [
    {
      id: 'idle'
    },
    {
      id: 'move',
      initial: true
    }
  ],
  transitions: [
    {
      event: 'mouseMove',
      source: 'move',
      target: 'move',
      method: 'move'
    },
    {
      event: 'portMouseEnter',
      source: 'move',
      target: 'move',
      method: 'snap'
    },
    {
      event: 'mouseUp',
      source: 'move',
      target: 'move',
      method: 'createPoint'
    },
    {
      event: 'portMouseDown',
      source: 'move',
      target: 'idle',
      method: 'snap'
    }
  ],
  subscriptions: [
    {
      event: 'createdEdge',
      method: 'constructor',
      create: true
    }
  ],
  methods: {
    constructor({ payload }){
      return {
        data: payload,
        addTag: payload.id
      }
    },
    move({ data, payload }){
      const {
        nativeEvent: { offsetX: x, offsetY: y }
      } = payload
      const point = data.points[data.points.length-1]
      const prevPoint = data.points[data.points.length-2]
      const dx = Math.abs(prevPoint.x - x)
      const dy = Math.abs(prevPoint.y - y)
      point.x = dx > dy ? x : prevPoint.x
      point.y = dx > dy ? prevPoint.y : y
      return {
        data
      }
    },
    snap({ data, payload }){
      const { points } = data
      if(points.length <= 2) return { data }
      const isSameSource = data.source === payload.source
      if(points.length <= 3 && isSameSource) return { data }
      const { x, y } = payload
      const point = data.points[data.points.length-1]
      const prevPoint = data.points[data.points.length-2]
      const dx = Math.abs(prevPoint.x - x)
      const dy = Math.abs(prevPoint.y - y)
      if(dy < dx) point.y = prevPoint.y = y
      if(dx < dy) point.x = prevPoint.x = x
      return {
        data
      }
    },
    createPoint({ data, payload }){
      data.points.push({
        x: payload.nativeEvent.offsetX,
        y: payload.nativeEvent.offsetY
      })
      return {
        data
      }
    }
  }
}

export default r.register(schema)