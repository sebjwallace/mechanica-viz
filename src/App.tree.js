import r from 'rithmic'

// export default {
//   id: 'graph',
//   root: {
//     schema: 'graph',
//     children: [
//       {
//         schema: 'grid',
//         event: 'createGrid',
//         public: true
//       },
//       {
//         schema: 'node',
//         event: 'createNode',
//         array: true,
//         alias: 'nodes'
//       },
//       {
//         schema: 'transition',
//         event: 'createTransition',
//         array: true,
//         alias: 'transitions'
//       }
//     ]
//   }
// }

r.tree.register({
  id: 'app',
  root: {
    schema: 'app',
    children: [
      {
        schema: 'graph'
      },
      // {
      //   event: 'createGraph',
      //   tree: 'graph',
      // },
      {
        schema: 'toolPanel'
      },
      {
        schema: 'propertiesPanel',
        // children: [
        //   {
        //     tree: 'graph'
        //   }
        // ]
      }
    ]
  }
})