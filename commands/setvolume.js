module.exports = {
    name: 'volume',
    description: 'sets the volume',
    execute(distube,client, message, args){
        distube.setVolume(message,args[0]);
    }
}