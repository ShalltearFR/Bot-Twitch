import { client, connect } from "./twitchConnexion.js";  

var cooldown = [];
var soundCommandsList = await fetch("assets/json/soundCommandsList.json")
    .then(response => {
        return response.json();
    })
    .then(jsondata => soundCommandsList = jsondata);

client.on('chat', (channel, userstate, message, self) => {
    if(self) return;

    var detectPlay = message.substring(0, 5)

    if(detectPlay === '!play')
    {
        var cmd = message.split(" ");
        for (var i = 0; i < cmd.length - 1; i++) { cmd[i] += " "; }
        for (var i = 3; i < cmd.length; i++) { cmd[1] = cmd[1] + cmd[i]; }

        if (soundCommandsList.find(record => record.CommandName === cmd[1].toLowerCase()) != null)
        {
            var json = soundCommandsList.find(record => record.CommandName.toLowerCase() === cmd[1].toLowerCase())
            
            if (json.ViewersFilter == "")
            {
                if (json.Mod == "false")
                {
                    if (json.Vip == "false")
                    {
                        PlaySound(json.CommandName, json.File, json.Volume, json.Cooldown, userstate['display-name']);
                    
                    } else if (json.Vip == "true")
                    {
                         // procedure pour detecter si l'utilisateur est VI
                        var vipTemp = userstate['badges'];
                        var isVip = false;

                        if (vipTemp !== null)
                        {
                            vipTemp = userstate['badges'].vip;
                           if (typeof vipTemp !== null) { isVip = true; }
                        }

                        if (isVip)
                        {
                            PlaySound(json.CommandName, json.File, json.Volume, json.Cooldown, userstate['display-name']);
                        }
                    }
                } else if (json.Mod == "true")
                {
                    // procedure pour detecter si l'utilisateur est modo
                    var modTemp = userstate['badges'];
                    var isMod = false;

                    if (modTemp !== null)
                    {
                        modTemp = userstate['badges'].moderator;
                        if (typeof modTemp !== null) { isMod = true; }
                    }

                    if (isMod)
                    {
                        PlaySound(json.CommandName, json.File, json.Volume, json.Cooldown, userstate['display-name']);
                    }
                } 
            } else if (json.ViewersFilter != "")
            {
                var list = json.ViewersFilter.toLowerCase();
                list = list.split(", ");
                
                if (list.includes(userstate['username']))
                {
                    PlaySound(json.CommandName, json.File, json.Volume, json.Cooldown, userstate['display-name']);
                }
            }
        }
    };
});

function PlaySound(name, file, volume, cooldownAntispam, viewerName)
{
    if (!cooldown.includes(name)) //detecter si bonjour n'est pas dans le tableau
    {
        cooldown.push(name); //ça le rajoute

        var sound = new Howl(
            {
                    src: [file],
                    volume: parseInt(volume) / 100,
            });
        sound.play()
    
        setTimeout(function()
        { 
            cooldown.splice(cooldown.indexOf(name)); // ca le supprime
        }, parseInt(cooldownAntispam) * 1000); 
        
        console.log("play : " + name)
    } else
    {
         // Message anti spam
         client.say(connect.twitch.channel, "/me " + viewerName + ", merci d'éviter le spam de commandes de sons")
    }
}