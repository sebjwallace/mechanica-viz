import r from 'rithmic'
import { calcTextWidth } from '../utils/svg.util'

const getStates = {
  subscriptions: [
    {
      event: 'GET:states',
      method: 'get'
    }
  ],
  methods: {
    get({ data }){
      return {
        response: data
      }
    }
  }
}

export default r.register({
  id: 'state',
  data: {},
  states: [
    {
      id: 'idle',
      initial: true
    },
    {
      id: 'selected.idle'
    },
    {
      id: 'selected.move'
    },
    {
      id: 'selected.moveCP'
    }
  ],
  transitions: [
    {
      event: 'stateMouseDown',
      source: 'idle',
      target: 'selected.move',
      publish: 'updated'
    },
    {
      event: 'mouseMove',
      source: 'selected.move',
      target: 'selected.move',
      method: 'move'
    },
    {
      event: 'mouseUp',
      source: 'selected.move',
      target: 'selected.idle'
    },
    {
      event: 'stateMouseDown',
      source: 'selected.idle',
      target: 'selected.move'
    },
    {
      event: 'deselectAllNodes',
      source: 'selected.idle',
      target: 'idle'
    },
    {
      event: 'mouseDown',
      source: 'selected.idle',
      target: 'idle'
    },
    {
      event: 'stateCpMouseDown',
      source: 'selected.idle',
      target: 'selected.moveCP',
      method: 'selectCP'
    },
    {
      event: 'mouseMove',
      source: 'selected.moveCP',
      target: 'selected.moveCP',
      method: 'moveCP'
    },
    {
      event: 'mouseUp',
      source: 'selected.moveCP',
      target: 'selected.idle'
    },
    {
      event: 'del',
      source: 'selected.idle',
      target: 'idle',
      method: 'remove'
    }
  ],
  publications: {
    updated: {
      event: 'UPDATED:state',
      payload: ({ data }) => data
    },
    movedScaled: {
      event: 'stateMovedScaled',
      payload: ({ data: { before, view: after } }) => ({ before, after })
    }
  },
  subscriptions: [
    {
      event: 'PATCH:state',
      method: 'patch'
    },
    ...getStates.subscriptions
  ],
  methods: {
    constructor({ payload: { id } }){
      const fontSize = 14
      return {
        data: {
          id,
          view: {
            x: 0,
            y: 0,
            height: 50,
            width: calcTextWidth(id, '"Roboto"', fontSize) * 1.5
          }
        }
      }
    },
    ...getStates.methods,
    patch({ data, payload }){
      return {
        data: { ...data, ...payload },
        publish: 'updated'
      }
    },
    move({ data, payload }){
      const { movementX, movementY } = payload
      const before = { ...data.view }
      data.view.x += movementX
      data.view.y += movementY
      data.before = before
      return {
        data,
        publish: [
          'updated',
          'movedScaled'
        ]
      }
    },
    selectCP({ data, payload }){
      data.selectedCp = payload.position
      return { data }
    },
    moveCP({ data, payload }){
      const { movementX, movementY } = payload
      const { view } = data
      const prev = { ...view }
      data.before = prev
      if(data.selectedCp === 'TL'){
        view.x += movementX
        view.y += movementY
        view.width -= movementX
        view.height -= movementY
      }
      if(data.selectedCp === 'TR'){
        view.y += movementY
        view.width += movementX
        view.height -= movementY
      }
      if(data.selectedCp === 'BL'){
        view.x += movementX
        view.width -= movementX
        view.height += movementY
      }
      if(data.selectedCp === 'BR'){
        view.width += movementX
        view.height += movementY
      }
      return {
        data,
        publish: [
          'updated',
          'movedScaled'
        ]
      }
    },
    remove(){
      return {
        delete: true
      }
    }
  }
})