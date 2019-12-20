import React, { useState } from 'react'
import Rithmic from 'rithmic'

import './RegistryView.scss'

import TabbedCard from './TabbedCard'
import AccordionItem from './AccordionItem'
import StateDetails from './StateDetails'
import TransitionDetails from './TransitionDetails'
import SubscriptionDetails from './SubscriptionDetails'
import MethodDetails from './MethodDetails'
import DefinitionDetails from './DefinitionDetails'
import MachineChart from './MachineChart'
import InputButton from './InputButton'

export default () => {

  const schemas = Rithmic.tree.getMachines('schema').map(({ data }) => data)
  const [ { schemaId }, setState ] = useState({ schemaId: '' })

  const isDisabled = !schemaId || schemas.find(({ id }) => id === schemaId)
  const send = () => Rithmic.send({
    event: 'REGISTRY:CREATE_SCHEMA',
    payload: {
      id: schemaId
    }
  })

  return <div className="RegistryView">
    <div className="tools">
      <InputButton
        onChange={e => setState({ schemaId: e.target.value })}
        onEnter={() => send() && setState({ schemaId: '' })}
        onClick={() => send() && setState({ schemaId: '' })}
        buttonText="Create Schema"
        placeholder="schema id"
        disabled={isDisabled}
      />
    </div>
    {
      schemas.map(schema => {
        const { id, states, transitions, subscriptions, methods } = schema
        return <div className="schemaItem">
          <AccordionItem title={id}>
            <TabbedCard
              tabs={[
                { id: 'states', label: 'States', content: <StateDetails schemaId={id} states={states} /> },
                { id: 'transitions', label: 'Transitions', content: <TransitionDetails schemaId={id} states={states} transitions={transitions} methods={methods} /> },
                { id: 'subscriptions', label: 'Subscriptions', content: <SubscriptionDetails schemaId={id} subscriptions={subscriptions} methods={methods} /> },
                { id: 'publications', label: 'Publications' },
                { id: 'methods', label: 'Methods', content: <MethodDetails schemaId={id} methods={methods} /> },
                { id: 'events', label: 'Events' },
                { id: 'data', label: 'Data' },
                { id: 'definition', label: 'Definition', content: <DefinitionDetails schema={schema} /> },
                { id: 'chart', label: 'Chart', content: <MachineChart states={states} transitions={transitions} /> }
              ]}
            />
          </AccordionItem>
        </div>
      })
    }
  </div>

}