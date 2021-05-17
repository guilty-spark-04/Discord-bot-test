
module.exports = {
    name: 'repeat',
    description: 'repeats playlist',
    execute(distube,client, message, args){
        let mode = distube.setRepeatMode(message, parseInt(args[0]));
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        client.channels.cache.get('275507083485380608').send("Set repeat mode to `" + mode + "`");
    }
}