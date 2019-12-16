import r from 'rithmic'

r.tree.register({
  id: 'app',
  root: {
    schema: 'app',
    children: [
      {
        schema: 'canvas',
        children: [
          {
            schema: 'stateMachine',
            children: [
              {
                schema: 'state',
                array: true,
                alias: 'states',
                create: 'createState'
              },
              {
                schema: 'transition',
                array: true,
                alias: 'transitions',
                create: 'createTransition'
              }
            ]
          },
          {
            schema: 'ContextMenu',
            alias: 'contextMenu'
          }
        ]
      },
      {
        schema: 'PropsPanel',
        children: [
          {
            schema: 'StateProps'
          },
          {
            schema: 'TransitionProps'
          }
        ]
      },
      {
        schema: 'CreateStateModal',
        domains: [
          'PATCH:create-transition-modal'
        ]
      },
      {
        schema: 'CreateTransitionModal'
      }
    ]
  }
})