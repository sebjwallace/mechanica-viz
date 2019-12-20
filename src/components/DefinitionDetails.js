import React from 'react'

export default ({ schema }) => {

  return <div className="DefinitionDetails">
    <pre>
      { JSON.stringify(schema, null, 2) }
    </pre>
  </div>

}