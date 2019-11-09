
function Automata(){

  const machines = {}

  function create(def){
    const { id, initial, states, actions } = def

    let currentState = initial

    function send(event){
      const { state, action, message } = states[currentState].transitions[event]
      actions[action]()

      for(let i in message){
        machines[i].send(message[i])
      }

      currentState = state
    }

    const machine = {
      send
    }

    machines[id] = machine

    return machine

  }

  return {
    create
  }

}

export default Automata