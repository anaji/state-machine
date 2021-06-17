const { changeState, getCurrentState, canChangeState,getNextState,reset } = require('./lib/stateMachine.js')
var express = require('express');
var app = express();

const enableTransition = async (path,res) =>{
  if(!canChangeState(path)){
    res.status(500).json({ 
      error: `transition from ${getCurrentState()} to ${path} is impossible (next is : ${getNextState()})` 
    })
    return
  }
  try{
    await changeState()
    res.status(200).json({ state: getCurrentState() })
  }catch(error){
    console.log(error)
    res.status(500).json({ error: error })
    return
  }
}

app.get('/test', function(req, res) {
  res.send('hello world');
});

app.get('/currentState', function(req, res) {
  res.json({ state: getCurrentState() })
  
});

app.get('/nextState', function(req, res) {
  res.json({ state: getNextState() })
  
});

app.get('/reset', function(req, res) {
  reset()
  res.json({ state: getCurrentState() })
});

app.get('/Starting', async function(req, res) {
  const transition = req.path.substring(1)
  enableTransition(transition,res)
});

app.get('/Started', async function(req, res) {
  const transition = req.path.substring(1)
  enableTransition(transition,res)
});

app.get('/Stopping', function(req, res) {
  const transition = req.path.substring(1)
  enableTransition(transition,res)
});

app.get('/Waiting', function(req, res) {
  const transition = req.path.substring(1)
  enableTransition(transition,res)
});

app.get('/Executing', function(req, res) {
  const transition = req.path.substring(1)
  enableTransition(transition,res)
});

app.get('/Executing', function(req, res) {
  const transition = req.path.substring(1)
  enableTransition(transition,res)
});
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  
  console.log("Example app listening at http://%s:%s", host, port)
})