module.exports = {
    name: 'autoplay',
    description: 'toggles autoplay',
    execute(distube,client, message, args){
        if(distube.isPlaying(message)){
        let mode = distube.toggleAutoplay(message);
        client.channels.cache.get('275507083485380608').send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
        }
        else{
            client.channels.cache.get('275507083485380608').send("vveh, nothing is playing, cannot toggle autoplay.")
        }
    }
}