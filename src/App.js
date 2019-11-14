import React from 'react'
import useForceUpdate from 'use-force-update'

import { Machine, calcMachineDims } from './components/Machine'
import Message from './components/Message'

import Rithmic from './engine/Rithmic'

const schema = {
  machines: [
    {
      id: 'AND1',
      tags: [
        'gate'
      ],
      states: [
        {
          id: 'ON',
          send: '1'
        },
        {
          id: 'IDLE',
          initial: true
        },
        {
          id: 'OFF',
          send: '0'
        },
        // {
        //   id: 'X'
        // },
        // {
        //   id: 'Y'
        // }
      ],
      transitions: [
        {
          source: 'OFF',
          event: 'FLIP',
          target: 'IDLE'
        },
        {
          source: 'IDLE',
          event: 'OFF',
          target: 'OFF'
        },
        {
          source: 'IDLE',
          event: 'ON',
          target: 'ON'
        },
        {
          source: 'ON',
          event: 'FLIP',
          target: 'IDLE'
        },
        // {
        //   source: 'ON',
        //   event: '1',
        //   target: 'X'
        // },
        // {
        //   source: 'ON',
        //   event: '0',
        //   target: 'Y'
        // },
        // {
        //   source: 'Y',
        //   event: '1',
        //   target: 'OFF'
        // },
        // {
        //   source: 'Y',
        //   event: '0',
        //   target: 'OFF'
        // },
        // {
        //   source: 'X',
        //   event: '0',
        //   target: 'OFF'
        // },
        // {
        //   source: 'X',
        //   event: '1',
        //   target: 'ON'
        // }
      ],
      messages: [
        {
          id: '0',
          event: '0',
          target: {
            ids: ['AND2']
          }
        },
        {
          id: '1',
          event: '1',
          target: {
            ids: ['AND2']
          }
        }
      ],
      viz: {
        x: 50,
        y: 50
      }
    },
    {
      id: 'AND2',
      tags: [
        'gate'
      ],
      states: [
        {
          id: 'ON',
          // send: '1'
        },
        {
          id: 'OFF',
          // send: '0',
          initial: true
        },
        // {
        //   id: 'X'
        // },
        // {
        //   id: 'Y'
        // }
      ],
      transitions: [
        {
          source: 'ON',
          event: '0',
          target: 'OFF'
        },
        {
          source: 'OFF',
          event: '1',
          target: 'ON'
        },
        // {
        //   source: 'ON',
        //   event: '1',
        //   target: 'X'
        // },
        // {
        //   source: 'ON',
        //   event: '0',
        //   target: 'Y'
        // },
        // {
        //   source: 'Y',
        //   event: '1',
        //   target: 'OFF'
        // },
        // {
        //   source: 'Y',
        //   event: '0',
        //   target: 'OFF'
        // },
        // {
        //   source: 'X',
        //   event: '1',
        //   target: 'ON'
        // },
        // {
        //   source: 'X',
        //   event: '0',
        //   target: 'OFF'
        // }
      ],
      messages: [
        // {
        //   id: '0',
        //   event: '0',
        //   target: {
        //     ids: ['AND3']
        //   }
        // },
        // {
        //   id: '1',
        //   event: '1',
        //   target: {
        //     ids: ['AND3']
        //   }
        // }
      ],
      viz: {
        x: 400,
        y: 50
      }
    },
    // {
    //   id: 'AND3',
    //   tags: [
    //     'gate'
    //   ],
    //   states: [
    //     {
    //       id: 'ON'
    //     },
    //     {
    //       id: 'OFF',
    //       initial: true
    //     },
    //     {
    //       id: 'X'
    //     },
    //     {
    //       id: 'Y'
    //     }
    //   ],
    //   transitions: [
    //     {
    //       source: 'OFF',
    //       event: '1',
    //       target: 'X'
    //     },
    //     {
    //       source: 'OFF',
    //       event: '0',
    //       target: 'Y'
    //     },
    //     {
    //       source: 'ON',
    //       event: '1',
    //       target: 'X'
    //     },
    //     {
    //       source: 'ON',
    //       event: '0',
    //       target: 'Y'
    //     },
    //     {
    //       source: 'Y',
    //       event: '1',
    //       target: 'OFF'
    //     },
    //     {
    //       source: 'Y',
    //       event: '0',
    //       target: 'OFF'
    //     },
    //     {
    //       source: 'X',
    //       event: '1',
    //       target: 'ON'
    //     },
    //     {
    //       source: 'X',
    //       event: '0',
    //       target: 'OFF'
    //     }
    //   ],
    //   viz: {
    //     x: 400,
    //     y: 150
    //   }
    // }
  ]
}

const machines = schema.machines.map(schema => Rithmic.create(schema))

function App() {

  const forceUpdate = useForceUpdate()

  machines.forEach(machine => machine.onChange = () => forceUpdate())

  const machineDims = schema.machines.reduce((accum, machine) => ({
    ...accum,
    [machine.id]: calcMachineDims(machine)
  }), {})

  const machineNodes = schema.machines.map((machine, i) => {
    return <Machine
      { ...machine }
      machine={machines[i]}
    />
  })

  const messages = schema.machines.reduce((accum, machine, i) => {
    if(!machine.messages) return accum
    const messages = machine.messages.map(message => {
      const source = machine.id
      const target = message.target.ids[0]
      const isActive = machines[i].state.send
      return {
        source,
        target,
        event: message.event,
        isActive: Boolean(isActive)
      }
    })
    return [
      ...accum,
      ...messages
    ]
  }, [])

  const edgeCounts = {}
  const messageNodes = messages.map(({ source, target, event, isActive }) => {
    if(edgeCounts[source+target]) return null
    edgeCounts[source+target] = true
    if(!edgeCounts[target]) edgeCounts[target] = 0
    edgeCounts[target] += 1
    return <Message
      source={{
        id: source,
        x: machineDims[source].x,
        y: machineDims[source].y,
        width: machineDims[source].width,
        height: machineDims[source].height
      }}
      target={{
        id: target,
        x: machineDims[target].x,
        y: machineDims[target].y,
        width: machineDims[target].width,
        height: machineDims[target].height
      }}
      event={event}
      targetEdgeCount={edgeCounts[target]}
      isActive={isActive}
    />
  })

  return (
    <div className="App">
      <svg width="1000" height="1000">
        { machineNodes }
        { messageNodes }
      </svg>
    </div>
  );
}

export default App;
