const tmi = require('tmi.js')
const twitchConnect = require('../json/connect.json')

const twitchClient = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: twitchConnect.twitch.username,
        password: twitchConnect.twitch.oauth
    },
    channels: [ twitchConnect.twitch.channel ]
});

twitchClient.connect().catch(console.error)

    // twitchConnect = fetch("http://localhost:3000/assets/json/connect.json")
    //     .then(response => {
    //         return response.json();
    //         })
    //     .then(jsondata => twitchConnect = jsondata)
    
    //     twitchClient = new tmi.Client({
    //         options: { debug: true, messagesLogLevel: "info" },
    //         connection: {
    //             reconnect: true,
    //             secure: true
    //         },
    //         identity: {
    //             username: twitchConnect.twitch.username,
    //             password: twitchConnect.twitch.oauth
    //         },
    //         channels: [ twitchConnect.twitch.channel ]
    //     });
    
    //     twitchClient.connect().catch(console.error);


module.exports = { twitchClient , twitchConnect};