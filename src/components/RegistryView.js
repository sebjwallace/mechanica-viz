import React, { useState } from 'react'
import Rithmic from 'rithmic'

import './RegistryView.scss'

import TabbedCard from './TabbedCard'
import AccordionItem from './AccordionItem'
import StateDetails from './StateDetails'
import TransitionDetails from './TransitionDetails'
import InputButton from './InputButton'

const machine = Rithmic.tree.getMachine('registry')

export default () => {

  const [ { schemaId }, setState ] = useState({ schemaId: '' })
  const schemas = Rithmic.tree.getMachines('schema').map(({ data }) => data)

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
      schemas.map(({ id, states, transitions }) => <div className="schemaItem">
        <AccordionItem title={id}>
          <TabbedCard
            tabs={[
              { id: 'states', label: 'States', content: <StateDetails states={states} /> },
              { id: 'transitions', label: 'Transitions', content: <TransitionDetails schemaId={id} states={states} transitions={transitions} /> },
              { id: 'subscriptions', label: 'Subscriptions' },
              { id: 'publications', label: 'Publications' },
              { id: 'methods', label: 'Methods' }
            ]}
          />
        </AccordionItem>
      </div>)
    }
  </div>

}