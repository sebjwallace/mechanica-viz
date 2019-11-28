import r from 'rithmic'

const schema = {
  id: 'transition',
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
      event: 'mouseDown',
      source: 'move',
      target: 'move',
      method: 'createPoint'
    },
    {
      event: 'closedEdge',
      source: 'move',
      target: 'idle'
    },
    {
      event: 'esc',
      source: 'move',
      target: 'idle',
      method: 'remove'
    },
    {
      event: 'transitionMouseDown',
      source: 'idle',
      target: 'edit',
      method: 'edit'
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
      event: 'updatedState',
      method: 'snap'
    },
    {
      event: 'updatedModel',
      method: 'update'
    }
  ],
  methods: {
    constructor(){
      return {
        send: {
          event: 'updateModel'
        }
      }
    },
    update({ data, payload }){
      data.model = payload
      return {
        data
      }
    },
    move({ data, payload }){
      const {
        nativeEvent: { offsetX: x, offsetY: y }
      } = payload
      const points = data.model.schema.transitions[data.id].view.points
      const point = points[points.length-1]
      const prevPoint = points[points.length-2]
      const dx = Math.abs(prevPoint.x - x)
      const dy = Math.abs(prevPoint.y - y)
      point.x = dx > dy ? x : prevPoint.x
      point.y = dx > dy ? prevPoint.y : y
      return {
        data
      }
    },
    snap({ data, payload }){
      const transition = data.model.schema.transitions[data.id].view
      const isSource = payload.id === transition.source.index
      const isTarget = payload.id === transition.target.index
      if(!isSource && !isTarget) return
      const { x, y, width, height } = data.model.schema.states[payload.id].view
      const { points } = transition
      if(isSource){
        const offsetX = x + (width * transition.source.ratioX)
        const offsetY = y + (height * transition.source.ratioY)
        const point = points[1]
        const prevPoint = points[0]
        const isVert = prevPoint.x === point.x
        const isHorz = prevPoint.y === point.y
        if(isVert) point.x = offsetX
        if(isHorz) point.y = offsetY
        prevPoint.x = offsetX
        prevPoint.y = offsetY
      }
      if(isTarget) {
        const offsetX = x + (width * transition.target.ratioX)
        const offsetY = y + (height * transition.target.ratioY)
        const point = points[points.length - 1]
        const prevPoint = points[points.length - 2]
        const isVert = prevPoint.x === point.x
        const isHorz = prevPoint.y === point.y
        if(isVert) prevPoint.x = offsetX
        if(isHorz) prevPoint.y = offsetY
        point.x = offsetX
        point.y = offsetY
      }
      return {
        send: {
          event: 'updateModel',
          payload: data.model
        }
      }
    },
    edit({ data, payload }){
      const { nativeEvent: { offsetX, offsetY } } = payload
      data.selectedPoint = payload.selectedPoint || data.selectedPoint

      const transition = data.model.schema.transitions[data.id].view
      const points = transition.points
      const point = points[data.selectedPoint]
      const prevPoint = points[data.selectedPoint - 1]
      const isVert = prevPoint.x === point.x
      const isHorz = prevPoint.y === point.y
      if(isVert) point.x = prevPoint.x = offsetX
      if(isHorz) point.y = prevPoint.y = offsetY

      const isInterpoint = data.selectedPoint > 1 && data.selectedPoint < points.length - 1
      if(!isInterpoint){
        const isStart = data.selectedPoint === 1
        const endPoint = isStart ? prevPoint : point
        const type = isStart ? 'source' : 'target'
        const node = data.model.schema.states[transition[type].index].view
        transition[type].ratioX = (endPoint.x - node.x) / node.width
        transition[type].ratioY = (endPoint.y - node.y) / node.height
      }

      return {
        data,
        send: {
          event: 'updateModel',
          payload: data.model
        }
      }
    },
    createPoint({ data, payload }){
      const points = data.model.schema.transitions[data.id].view.points
      points.push({
        x: payload.nativeEvent.offsetX,
        y: payload.nativeEvent.offsetY
      })
      return {
        send: {
          event: 'updateModel',
          payload: data.model
        }
      }
    },
    remove(){
      return { delete: true }
    }
  }
}

export default r.register(schema)