let start = document.querySelector("#start")
let stop = document.querySelector("#stop")
let address = document.querySelector("#address")
let ip = document.querySelector("#ip")
let responses = document.querySelector("#responses")
let process_id = 0

start.addEventListener("click", async (e) => {
  e.preventDefault()
  var python = require('child_process').spawn('/Users/tongjian/Documents/app/getPages/backend/bin/python', ['-u', 'backend/backend.py', address.value, ip.value]);
  process_id = python.pid
  python.stdout.on('data',function(data){
    console.log("data: ",data.toString('utf8'));
    let responseText = data.toString('utf8')+address.value+ip.value
    let response = document.createElement("div")
    response.textContent = responseText
    responses.appendChild(response)
  });
  python.stderr.on('data',function(data){
    console.log("err data: ",data.toString('utf8'));
  });
  python.on('close',(code) => {
    console.log(`child process exited with code ${code}`);
  });
})

stop.addEventListener("click", async (e) => {
  e.preventDefault()
  var python = require('child_process').spawn('kill', ['-SIGTERM', process_id]);
  python.stdout.on('data',function(data){
      console.log("data: ",data.toString('utf8'));
      let responseText = data.toString('utf8')+address.value+ip.value
      let response = document.createElement("div")
      response.textContent = responseText
      responses.appendChild(response)
  });
  python.stderr.on('data',function(data){
    console.log("err data: ",data.toString('utf8'));
  });
  python.on('close',(code) => {
    console.log(`child process exited with code ${code}`);
  });
  
})