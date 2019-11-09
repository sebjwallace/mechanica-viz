import React from 'react'
import { State, calcStateWidth } from './State'
import Transition from './Transition'

export const Machine = ({ states, transitions, viz }) => {
  
  const x = viz.x || 0
  const y = viz.y || 0

  const {
    width,
    height,
    offsetY,
    transitionNodesPrep,
    stateNodesPrep,
    stateNodePositions
  } = calcMachineDims({ states, transitions, viz })

  const stateNodes = stateNodesPrep.map(({ x, y, state }) => <State
    x={x}
    y={y+offsetY}
    { ...state }
  />)

  const transitionNodes = transitionNodesPrep.map(({
    transition,
    offsetLeftY,
    offsetRightY,
    offsetTargetX
  }) => <Transition
    { ...transition }
    statePositions={stateNodePositions}
    offsetLeftY={offsetLeftY}
    offsetRightY={offsetRightY}
    offsetTargetX={offsetTargetX}
    offsetY={offsetY}
  />)

  return <g>
    <rect
      width={width}
      height={height}
      x={x}
      y={y}
      style={{
        fill: 'white',
        strokeWidth: 3,
        stroke: '#dcdcdc'
      }}
    />
    { stateNodes }
    { transitionNodes }
  </g>

}

export const calcMachineDims = ({ states, transitions, viz }) => {

  const x = viz.x || 0
  const y = viz.y || 0

  const margin = 10
  const spacing = 30

  const width = states.reduce((accum, state) => {
    return accum + calcStateWidth(state.id)
  }, spacing * states.length)

  let accumLeft = margin
  const stateNodePositions = {}
  const stateNodesPrep = states.map((state, i) => {
    const space = i > 0 ? spacing : 0
    const sw = calcStateWidth(state.id)
    const sx = accumLeft + x + space
    const sy = y + margin
    accumLeft += sw + space
    stateNodePositions[state.id] = { x: sx, y: sy, w: sw }
    return { x: sx, y: sy, state }
  })

  let transitionLeftCount = 0
  let transitionRightCount = 0
  const edgeCounts = {}
  const transitionNodesPrep = transitions.map((transition) => {
    const { source, target } = transition
    const isLeft = stateNodePositions[source].x
      > stateNodePositions[target].x
    if(isLeft) transitionLeftCount++
    else transitionRightCount++
    if(!edgeCounts[isLeft+target]) edgeCounts[isLeft+target] = 0
    edgeCounts[isLeft+target] += 1
    return {
      transition,
      offsetLeftY: transitionLeftCount,
      offsetRightY: transitionRightCount,
      offsetTargetX: edgeCounts[isLeft+target]
    }
  })

  const offsetY = transitionLeftCount * 15
  const height = (transitionLeftCount*15)+(transitionRightCount*15)+25+25

  return {
    x,
    y,
    width,
    height,
    offsetY,
    transitionNodesPrep,
    stateNodesPrep,
    stateNodePositions
  }

}