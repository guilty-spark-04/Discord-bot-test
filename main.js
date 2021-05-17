//requirements
const Discord = require("discord.js");
var fs = require('fs');
const DisTube = require('distube');
const express = require('express');
const mongoose = require('mongoose');


//Connect to Mongo DB
const URI = process.env.MONGO;
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));
    
//Discord Stuff
const client = new Discord.Client({partials: ['MESSAGE','CHANNEL','REACTION']});
const distube = new DisTube(client,{searchSongs: true,emitNewSongOnly: true, highWaterMark: 1 << 25});


client.commands = new Discord.Collection();

//grabs all the command files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name,command)
}

//command to run after a successful connection to the discord api
client.once("ready", () => {
    console.log("bot is online! (test version)");
    client.user.setActivity('Moderation', { type: 'PLAYING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
});

//listens to whenever a message is sent. Goes to handler.
client.on("message", async(message) => {
    client.commands.get('handler').execute(client,message,distube,Discord,mongoose);
});



const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) => client.channels.cache.get('275507083485380608').send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => client.channels.cache.get('275507083485380608').send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue.`
    ))
    .on("playList", (message, queue, playlist, song) => client.channels.cache.get('275507083485380608').send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => client.channels.cache.get('275507083485380608').send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        client.channels.cache.get('275507083485380608').send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.duration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => client.channels.cache.get('275507083485380608').send(`Searching canceled`))
    .on("error", (message, err) => client.channels.cache.get('275507083485380608').send(
        "An error encountered: " + err
    ));












client.login(process.env.TOKEN);
