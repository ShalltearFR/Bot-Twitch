const express = require('express')
const expressApp = express()
const port = 3000

require('./assets/js/twitchConnexion.js') // Connexion à Twitch
require('./assets/js/twitchInteraction.js') // Interraction avec le chat twitch

require('./assets/js/obsConnexion.js') // Connexion à OBS via websocket

// Creation du site en localhost
expressApp.use('', express.static(__dirname));
expressApp.listen(port, () => { // Demarrage du site
    console.log(`Serveur démarré avec le port ${port}`)
  })

