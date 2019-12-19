import React, { useState } from 'react'

import './AccordionItem.scss'

export default ({ title, children }) => {

  const [ { isOpen }, setState ] = useState({ isOpen: false })

  return <div className="AccordionItem">
    <div
      className="title"
      onClick={() => setState({ isOpen: !isOpen })}
    >
      { title }
    </div>
    {
      isOpen && <div>
        { children }
      </div>
    }
  </div>

}