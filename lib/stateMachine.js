//utils functions
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
const sleep = async () => {
  console.log(`state ${stateTransition.transitions[currentStateIndex].name} in Execution (busy)`);
  flag = BUSY
  await snooze(5000);
  flag = AVAILABLE
  console.log(`state ${stateTransition.transitions[currentStateIndex].name} completed`);
}

//states & scenario
const states = {
  STARTING: 'Starting',
  STARTED: 'Started',
  WAITING: 'Waiting',
  EXECUTING: 'Executing',
  STOPPING: 'Stopping',
  STOPPED: 'Stopped',
}

const stateTransition = {
  transitions:[
    {name:states.STOPPING, from:states.WAITING, to:states.STOPPED, action: sleep},
    {name:states.STOPPED, from:states.STOPPING, to:states.STARTING},
    {name:states.STARTING, from:states.STOPPING, to:states.STARTED, action: sleep},
    {name:states.STARTED, from:states.STARTING, to:states.WAITING},
    {name:states.WAITING, from:states.STARTED, to:states.EXECUTING, action: sleep},
    {name:states.EXECUTING, from:states.WAITING, to:states.WAITING, action: sleep},
    {name:states.WAITING, from:states.EXECUTING, to:states.STOPPING, action: sleep},
  ]
}

//variable  & constants
const initialState = stateTransition.transitions.findIndex(state => state.name === states.STOPPED)
let currentStateIndex = initialState
const BUSY = 1
const AVAILABLE = 0
let flag = AVAILABLE

module.exports = {

  changeState: async () => {
    if(flag === BUSY){
      throw new Error("IS BUSY") 
    }
    
    const transitionArray = stateTransition.transitions
    let currentState = transitionArray[currentStateIndex]
    
    if(currentState.name === states.EXECUTING){
      let reversedArray = [...transitionArray].reverse();
      let lastWaitingIndex = reversedArray.lastIndexOf(state => currentState.from === state.name);
      currentStateIndex = (transitionArray.length - 1) - lastWaitingIndex
    }
    else{   
      currentStateIndex = stateTransition.transitions.findIndex(state => state.name === currentState.to)
    }
    return  stateTransition.transitions[currentStateIndex].action?.call(this)
  },

  getCurrentState: () => stateTransition.transitions[currentStateIndex].name,
  getNextState: () => stateTransition.transitions[currentStateIndex].to,
  canChangeState: (state) => stateTransition.transitions[currentStateIndex].to === state,
  reset: () => currentStateIndex = initialState
}