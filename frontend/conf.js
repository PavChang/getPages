var config = require('config')
let proxy_conf = document.querySelector("#proxy_conf")
let time_conf = document.querySelector("#time_conf")
let advanced_conf = document.querySelector("#advanced_conf")
// à écrire sur le fichier de configuration avec d'autres modules
proxy_conf.addEventListener("submit", async (e) => {
  console.log(config.get("config"))
  config.proxy = document.querySelector("#proxy").value
  config.port = document.querySelector("#port").value
})

time_conf.addEventListener("submit", async (e) => {
  config.wait_time = document.querySelector("#wait_time").value
  config.other = document.querySelector("#other").value
})

advanced_conf.addEventListener("submit", async (e) => {
  config.headers = document.querySelector("#headers").value
  config.proxy_list = document.querySelector("#proxy_list").value
})

