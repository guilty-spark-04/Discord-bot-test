
module.exports = {
    name: 'skip',
    description: 'skips stuff',
    execute(distube,client, message, args){
        try{
            distube.skip(message);
            }
            catch (e){
                client.channels.cache.get('275507083485380608').send("There is nothing in the queue");
            }
    }
}