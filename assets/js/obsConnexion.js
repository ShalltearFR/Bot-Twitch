const obsConnect = require('../json/connect.json')
const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();

obs.connect({
    address: obsConnect.obs.ip,
    password: obsConnect.obs.password
})
.then(() => { console.log("	>> Connexion vers OBS réussi."); })
.catch(err => { console.log("	>> OBS n'a pas été demarré."); });


// connexion()
// async function connexion(){
//     let obsConnect
//     obsConnect = await fetch("http://localhost:3000/assets/json/connect.json")
//         .then(response => {
//             return response.json();
//             })
//         .then(jsondata => obsConnect = jsondata)

//           console.log("	>> Connexion à OBS ...");
//           obs.connect({
//                 address: obsConnect.obs.ip,
//                 password: obsConnect.obs.password
//             })
//             .then(() => { console.log("	>> Connexion vers OBS réussi."); })
//             .catch(err => { console.log("	>> OBS n'a pas été demarré."); });
            //return [obsConnect.obs.ip, obsConnect.obs.password]



module.exports = { obs };