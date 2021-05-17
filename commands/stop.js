
module.exports = {
    name: 'stop',
    description: 'stops stuff',
    execute(distube,client, message, args){
        if(distube.isPlaying(message)){
            distube.stop(message);
        }
        client.channels.cache.get('275507083485380608').send("Stopped queue");
        message.member.voice.channel.leave();
    }
}