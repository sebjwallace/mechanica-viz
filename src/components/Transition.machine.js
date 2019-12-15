import r from 'rithmic'

const schema = {
  id: 'transition',
  data: {
    event: '',
    view: {}
  },
  states: [
    { id: 'idle' },
    { id: 'selected' },
    { id: 'move', initial: true },
    { id: 'edit' },
    { id: 'source.idle', initial: true },
    { id: 'target.idle', initial: true },
    { id: 'source.selected' },
    { id: 'target.selected' },
    { id: 'sourceCP.idle', initial: true },
    { id: 'targetCP.idle', initial: true },
    { id: 'sourceCP.selected' },
    { id: 'targetCP.selected' }
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
      event: 'interfaceMouseDown',
      source: 'move',
      target: 'selected',
      method: 'close'
    },
    {
      event: 'PATCH:transition',
      source: 'selected',
      target: 'selected',
      method: 'patch'
    },
    {
      event: 'mouseDown',
      source: 'selected',
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
      event: 'transitionMouseDown',
      source: 'selected',
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
    },
    {
      event: 'selectState',
      source: 'source.idle',
      target: 'source.selected',
      guard: 'isSource'
    },
    {
      event: 'selectState',
      source: 'target.idle',
      target: 'target.selected',
      guard: 'isTarget'
    },
    {
      event: 'stateMovedScaled',
      source: 'source.selected',
      target: 'source.selected',
      method: 'sourceMove'
    },
    {
      event: 'stateMovedScaled',
      source: 'target.selected',
      target: 'target.selected',
      method: 'targetMove'
    },
    {
      event: 'mouseUp',
      source: 'source.selected',
      target: 'source.idle'
    },
    {
      event: 'mouseUp',
      source: 'target.selected',
      target: 'target.idle'
    },
    {
      event: 'stateCpMouseDown',
      source: 'sourceCP.idle',
      target: 'sourceCP.selected',
      guard: 'isSource'
    },
    {
      event: 'stateCpMouseDown',
      source: 'targetCP.idle',
      target: 'targetCP.selected',
      guard: 'isTarget'
    },
    {
      event: 'stateMovedScaled',
      source: 'sourceCP.selected',
      target: 'sourceCP.selected',
      method: 'sourceMove'
    },
    {
      event: 'stateMovedScaled',
      source: 'targetCP.selected',
      target: 'targetCP.selected',
      method: 'targetMove'
    },
    {
      event: 'mouseUp',
      source: 'sourceCP.selected',
      target: 'sourceCP.idle'
    },
    {
      event: 'mouseUp',
      source: 'targetCP.selected',
      target: 'targetCP.idle'
    }
  ],
  methods: {
    constructor({ data, payload: { x, y, stateId } }){
      data.source = stateId
      data.view = {
        points: [
          { x, y },
          { x, y }
        ]
      }
      return { data }
    },
    patch({ data, payload }){
      return {
        data: { ...data, ...payload }
      }
    },
    move({ data, payload }){
      const {
        nativeEvent: { offsetX: x, offsetY: y }
      } = payload
      const { points } = data.view
      const point = points[points.length-1]
      const prevPoint = points[points.length-2]
      const dx = Math.abs(prevPoint.x - x)
      const dy = Math.abs(prevPoint.y - y)
      point.x = dx > dy ? x : prevPoint.x
      point.y = dx > dy ? prevPoint.y : y
      return { data }
    },
    close({ data, payload }){
      data.target = payload.stateId
      return {
        data,
        send: {
          event: 'CREATED:transition',
          payload: data
        }
      }
    },
    edit({ data, payload }){
      const { nativeEvent: { offsetX, offsetY } } = payload
      data.selectedPoint = payload.selectedPoint || data.selectedPoint

      const transition = data.view
      const points = transition.points
      const point = points[data.selectedPoint]
      const prevPoint = points[data.selectedPoint - 1]
      const isVert = prevPoint.x === point.x
      const isHorz = prevPoint.y === point.y
      if(isVert) point.x = prevPoint.x = offsetX
      if(isHorz) point.y = prevPoint.y = offsetY

      return { data }
    },
    createPoint({ data, payload }){
      const { points } = data.view
      points.push({
        x: payload.nativeEvent.offsetX,
        y: payload.nativeEvent.offsetY
      })
      return { data }
    },
    remove(){
      return { delete: true }
    },
    isTarget({ data, payload }){
      return data.target === payload.id
    },
    isSource({ data, payload }){
      return data.source === payload.id
    },
    sourceMove({ data, payload }){
      const { before, after } = payload
      const { points } = data.view
      const [ prevPoint, point ] = points
      const dx = point.x - prevPoint.x
      const dy = point.y - prevPoint.y
      const rx = (prevPoint.x - before.x) / before.width
      const ry = (prevPoint.y - before.y) / before.height
      const x = after.x + (after.width * rx)
      const y = after.y + (after.height * ry)
      const isVert = prevPoint.x === point.x
      const isHorz = prevPoint.y === point.y
      if(isVert) point.x = x + dx
      if(isHorz) point.y = y + dy
      prevPoint.x = x
      prevPoint.y = y
      return { data }
    },
    targetMove({ data, payload }){
      const { before, after } = payload
      const { points } = data.view
      const point = points[points.length - 1]
      const prevPoint = points[points.length - 2]
      const dx = prevPoint.x - point.x
      const dy = prevPoint.y - point.y
      const rx = (point.x - before.x) / before.width
      const ry = (point.y - before.y) / before.height
      const x = after.x + (after.width * rx)
      const y = after.y + (after.height * ry)
      const isVert = prevPoint.x === point.x
      const isHorz = prevPoint.y === point.y
      if(isVert) prevPoint.x = x + dx
      if(isHorz) prevPoint.y = y + dy
      point.x = x
      point.y = y
      return { data }
    }
  }
}

export default r.register(schema)