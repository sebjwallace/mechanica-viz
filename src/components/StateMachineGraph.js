import React from 'react'
import Rithmic from 'rithmic'

import Node from './Node'
import Edge from './Edge'
import { calcTextWidth } from '../utils/svg.util'

export default ({ schemaId, states = [], transitions = [] }) => {

  return <div>
    <svg
      width="500"
      height="500"
      onMouseDown={e => Rithmic.send({
        event: 'MOUSE_DOWN',
        payload: e
      })}
      onMouseMove={e => Rithmic.send({
        event: 'MOUSE_MOVE',
        payload: e
      })}
      onMouseUp={e => Rithmic.send({
        event: 'MOUSE_UP',
        payload: e
      })}
    >
      {
        transitions.map(transition => {
          const source = states.find(state => state.id === transition.source)
          const target = states.find(state => state.id === transition.target)
          return <Edge
            sx={source.view.x}
            sy={source.view.y}
            tx={target.view.x}
            ty={target.view.y}
            tr={calcTextWidth(target.id, "monospace", 10) / 2}
            label={transition.event}
          />
        })
      }
      {
        states.map(({ id, view: { x, y } }) => <Node
          schemaId={schemaId}
          id={id}
          radius={calcTextWidth(id, "monospace", 10) / 2}
          x={x}
          y={y}
        />)
      }
    </svg>
  </div>

}