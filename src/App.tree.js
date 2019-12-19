export default {
  id: 'app',
  root: {
    schema: 'app',
    children: [
      {
        id: 'registry',
        schema: 'Registry',
        children: [
          {
            tag: 'schema',
            schema: 'Schema',
            array: true,
            create: 'SCHEMA:CREATE'
          }
        ]
      },
      {
        schema: 'AppTabs',
      }
    ]
  }
}