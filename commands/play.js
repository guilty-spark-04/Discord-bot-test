module.exports = {
    name: 'play',
    description: 'this plays stuff',
    execute(distube,client, message, args){
        var error = 0;
        try{
            const connection = message.member.voice.channel.join();
            }
            catch (e){
                client.channels.cache.get('275507083485380608').send("You must be in a voice channel.");
                error = 1;
            }
            let string = args.join(" ")
            if(!string){
                message.channel.send("Please enter a URL");
            }
            else if(error == 1){}
            else{
            distube.play(message,string);
            }
    }
}