export default {
  id: 'Registry',
  states: [],
  transitions: [],
  data: {
    schemas: []
  },
  subscriptions: [
    {
      event: 'REGISTRY:REGISTER_SCHEMA',
      method: 'registerSchema'
    },
    {
      event: 'REGISTRY:CREATE_SCHEMA',
      method: 'createSchema'
    },
    {
      event: 'SCHEMA:UPDATED',
      method: 'save'
    }
  ],
  publications: [
    {
      id: 'registeredSchema',
      event: 'REGISTRY:REGISTERED_SCHEMA',
      payload: ({ data: { schemas } }) => ({ schema: schemas[schemas.length - 1] })
    }
  ],
  methods: {
    registerSchema({ data, payload }){
      data.schemas.push(payload.schema)
      return {
        data,
        publish: 'registeredSchema'
      }
    },
    createSchema({ data, payload }){
      data.schemas.push(payload.id)
      return {
        data,
        publish: 'registeredSchema',
        send: {
          event: 'SCHEMA:CREATE',
          payload: { id: payload.id }
        }
      }
    }
  }
}