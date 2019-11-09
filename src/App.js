import React from 'react';

import { Machine, calcMachineDims } from './components/Machine'
import Message from './components/Message'

const schema = {
  groups: [
    {
      title: 'oven',
      members: ['switch', 'light']
    }
  ],
  machines: [
    {
      id: 'switch',
      tags: [
        'device'
      ],
      states: [
        {
          id: 'ON',
          initial: true
        },
        {
          id: 'OFF'
        },
        {
          id: 'IDLE'
        }
      ],
      transitions: [
        {
          event: 'FLIP',
          source: 'ON',
          target: 'OFF',
          actions: ['turnOff'],
          messages: ['flip']
        },
        {
          event: 'FLIP',
          source: 'OFF',
          target: 'ON',
          actions: ['turnOff'],
          messages: ['flip']
        },
        {
          event: 'FLIP',
          source: 'ON',
          target: 'IDLE'
        },
        {
          event: 'KNOCK',
          source: 'ON',
          target: 'IDLE'
        },
        {
          event: 'KNOCK',
          source: 'IDLE',
          target: 'ON'
        },
        {
          event: 'KNOCK',
          source: 'IDLE',
          target: 'OFF'
        }
      ],
      messages: [
        {
          id: 'flip',
          event: 'FLIP',
          payload: {},
          target: {
            ids: [
              'light'
            ],
            tags: [
              'button'
            ]
          }
        }
      ],
      actions: {
        turnOff(){}
      },
      viz: {
        x: 50,
        y: 50
      }
    },
    {
      id: 'light',
      states: [
        { id: 'ON' },
        { id: 'OFF' }
      ],
      transitions: [
        {
          event: 'FLIP',
          source: 'ON',
          target: 'OFF'
        },
        {
          event: 'FLIP',
          source: 'OFF',
          target: 'ON'
        }
      ],
      viz: {
        x: 400,
        y: 200
      }
    },
    {
      id: 'beep',
      states: [
        { id: 'ON' },
        { id: 'OFF' }
      ],
      transitions: [
        {
          event: 'FLIP',
          source: 'ON',
          target: 'OFF'
        },
        {
          event: 'FLIP',
          source: 'OFF',
          target: 'ON'
        }
      ],
      messages: [
        {
          id: 'flip',
          event: 'FLIP',
          payload: {},
          target: {
            ids: [
              'light'
            ]
          }
        }
      ],
      viz: {
        x: 700,
        y: 50
      }
    }
  ]
}

function App() {

  const { machines } = schema

  const machineDims = machines.reduce((accum, machine) => ({
    ...accum,
    [machine.id]: calcMachineDims(machine)
  }), {})

  const machineNodes = machines.map(machine => {
    return <Machine
      { ...machine }
    />
  })

  const messages = machines.reduce((accum, machine) => {
    if(!machine.messages) return accum
    const messages = machine.messages.map(message => ({
      source: machine.id,
      target: message.target.ids[0],
      event: message.event
    }))
    return [
      ...accum,
      ...messages
    ]
  }, [])

  const messageNodes = messages.map(({ source, target, event }) => {
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
