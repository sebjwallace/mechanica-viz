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
      event: 'graphMouseDown',
      source: 'move',
      target: 'move',
      method: 'createPoint'
    },
    {
      event: 'closeEdge',
      source: 'move',
      target: 'idle',
      method: 'close'
    }
  ],
  subscriptions: [
    {
      event: 'createdEdge',
      method: 'constructor',
      create: true
    },
    {
      event: 'updatedNode',
      method: 'snap'
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
      const isSource = payload.id === data.source.id
      const isTarget = payload.id === data.target.id
      if(!isSource && !isTarget) return
      const { x, y } = payload
      if(isSource){
        const point = data.points[1]
        const prevPoint = data.points[0]
        const isVert = prevPoint.x === point.x
        const isHorz = prevPoint.y === point.y
        if(isVert) point.x = x + data.sourceDx
        if(isHorz) point.y = y + data.sourceDy
        prevPoint.y = y + data.sourceDy
        prevPoint.x = x + data.sourceDx
      }
      if(isTarget) {
        const point = data.points[data.points.length - 1]
        const prevPoint = data.points[data.points.length - 2]
        const isVert = prevPoint.x === point.x
        const isHorz = prevPoint.y === point.y
        if(isVert) prevPoint.x = x + data.targetDx
        if(isHorz) prevPoint.y = y + data.targetDy
        point.y = y + data.targetDy
        point.x = x + data.targetDx
      }
      return {
        data
      }
    },
    close({ data, payload }){
      return {
        data: { ...data, ...payload }
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