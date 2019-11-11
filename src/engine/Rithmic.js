import Machine from './Machine'

function Rithmic(){

  const machines = {
    id: {},
    tags: {}
  }

  function create(schema){

    const machine = new Machine(schema)
    machines.id[schema.id] = machine

    schema.tags.forEach(tag => {
      if(!machines.tags[tag]){
        machines.tags[tag] = []
      }
      machines.tags[tag].push(machine)
    })

    machine.output = ({target, event, payload}) => {
      const { ids = [], tags = [] } = target
      ids.forEach(id => machines.id[id].input(event, payload))
      tags.forEach(tag => machines.tags[tag].forEach(machine => machine.input(event, payload)))
    }

    return machine

  }

  return {
    create
  }

}

export default Rithmic()