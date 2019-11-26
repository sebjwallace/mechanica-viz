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
    },
    {
      id: 'edit'
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
    },
    {
      event: 'edgeMouseDown',
      source: 'idle',
      target: 'edit',
      method: 'edit',
      guard: 'isSelectable'
    },
    {
      event: 'mouseMove',
      source: 'edit',
      target: 'edit',
      method: 'edit'
    },
    {
      event: 'mouseUp',
      source: 'edit',
      target: 'idle'
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
    isSelectable({ data, payload }){
      return data.id === payload.id
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
      const { x, y, width, height } = payload
      if(isSource){
        const offsetX = x + (width * data.sourceRatioX)
        const offsetY = y + (height * data.sourceRatioY)
        const point = data.points[1]
        const prevPoint = data.points[0]
        const isVert = prevPoint.x === point.x
        const isHorz = prevPoint.y === point.y
        if(isVert) point.x = offsetX
        if(isHorz) point.y = offsetY
        prevPoint.x = offsetX
        prevPoint.y = offsetY
      }
      if(isTarget) {
        const offsetX = x + (width * data.targetRatioX)
        const offsetY = y + (height * data.targetRatioY)
        const point = data.points[data.points.length - 1]
        const prevPoint = data.points[data.points.length - 2]
        const isVert = prevPoint.x === point.x
        const isHorz = prevPoint.y === point.y
        if(isVert) prevPoint.x = offsetX
        if(isHorz) prevPoint.y = offsetY
        point.x = offsetX
        point.y = offsetY
      }
      return {
        data
      }
    },
    close({ data, payload }){
      return {
        data: { ...data, ...payload },
        send: {
          event: 'closedEdge',
          payload: {
            source: data.source,
            target: payload.target
          }
        }
      }
    },
    edit({ data, payload }){
      data.selectedPoint = payload.selectedPoint || data.selectedPoint
      const { nativeEvent: { offsetX, offsetY } } = payload

      const { selectedPoint } = data
      const point = data.points[selectedPoint]
      const prevPoint = data.points[selectedPoint - 1]
      const isVert = prevPoint.x === point.x
      const isHorz = prevPoint.y === point.y
      if(isVert) point.x = prevPoint.x = offsetX
      if(isHorz) point.y = prevPoint.y = offsetY

      const isStart = selectedPoint === 1
      const endPoint = isStart ? prevPoint : point
      const node = isStart ? 'source' : 'target'
      data[node+'RatioX'] = (endPoint.x - data[node].x) / data[node].width
      data[node+'RatioY'] = (endPoint.y - data[node].y) / data[node].height

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