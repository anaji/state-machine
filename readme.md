# State Machine

state machine it's a little exercice to implement the FSM(finite state machine) in Javascript

The project is splitted by two files:

* [stateMachine.js](./lib/stateMachine.js)  which contains transitions, scenarios and functions that allows to manage states
* [index.js](./index.js) allows to enable each transition through a REST API.

states are :

```javascript
const states = {
  STARTING: 'Starting',
  STARTED: 'Started',
  WAITING: 'Waiting',
  EXECUTING: 'Executing',
  STOPPING: 'Stopping',
  STOPPED: 'Stopped',
}
```

Transitions is an array who contains scenario objects otherwise possible transition. action is the function which will call during the pase of the scenario. In this casen, the function is just a sleep of few seconds which allows to simulate a stask

```javascript
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
```

important: node > v14 is required

```
npm install
node index.js
```

Each REST API endpoint are defined in [index.js](./index.js) file