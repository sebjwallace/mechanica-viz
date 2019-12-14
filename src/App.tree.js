import r from 'rithmic'

r.tree.register({
  id: 'app',
  root: {
    schema: 'app',
    children: [
      {
        schema: 'toolPanel'
      },
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
        schema: 'CreateStateModal'
      },
      {
        schema: 'CreateTransitionModal'
      }
    ]
  }
})