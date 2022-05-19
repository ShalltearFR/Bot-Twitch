const {twitchClient, twitchConnect} = require('./twitchConnexion.js')
//const twitchClient = require('./twitchConnexion.js').twitchClient
    

console.log("twitchConnect =",twitchConnect)
console.log("twitchClient =",twitchClient)
    
twitchClient.say(twitchConnect.twitch.channel, "coucou")

