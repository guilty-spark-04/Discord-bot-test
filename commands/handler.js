const { mongo } = require('mongoose');

module.exports = {
    name:'handler',
    description: 'handles the responses given by the bot',
    async execute(client, message,distube, Discord,mongoose){
        const prefix = '$';
        var word_count = message.content.split(" ").length;
    
        if(word_count > 75 && !message.author.bot){
        await client.commands.get('wow').execute(client, message);
    }


    //data base stuff
    
    
    //end of database stuff
   

    //actual commands are handled
    else if(message.content.startsWith(prefix) && !message.author.bot){

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        await message.channel.send("<a:pet:756565544907440189>");
    }
    if(command == 'amgry'){
        await message.channel.send("<a:amgry:756579615614566829>");
    }
    if(command == 'irelia'){
        await message.channel.send("<a:irelia:756590418476531833>");
    }
    if(command == 'irelia2'){
        await message.channel.send("<a:irelia2:756591517199630336>");
    }
    if(command == 'nami'){
        await message.channel.send("<a:nami:801954835083558943>");
    }
    if(command == 'jhin'){
        await message.channel.send("<a:jhin:801985732422926357>");
    }
    if(command == 'jhin2'){
        await message.channel.send("<a:jhin2:801983368404271133>");
    }
    if(command == 'play'){
        client.commands.get('play').execute(distube,client, message,args);

    }
    if(command == 'stop'){
        client.commands.get('stop').execute(distube,client, message,args);
    }
    if(command == 'skip'){
        client.commands.get('skip').execute(distube,client, message,args);
    }
    if(command == 'volume'){
        client.commands.get('volume').execute(distube,client, message,args);
    }
    if(command == 'autoplay'){
        if(distube.isPlaying(message)){
        client.commands.get('autoplay').execute(distube,client,message,args);
        }
        else{
            client.channels.cache.get('275507083485380608').send("vveh, Cannot execute command, nothing is playing!");
        }
    }
    if(command == 'repeat'){
        if(distube.isPlaying(message)){
            client.commands.get('repeat').execute(distube,client,message,args);
        }
        else{
            client.channels.cache.get('275507083485380608').send("vveh, Cannot execute command, nothing is playing!");
        }
    }
    if(command == 'poll'){
        client.commands.get('poll').execute(Discord,message);
    }
    if(command == 'sentiment'){
        console.log("hi2");
        client.commands.get('sentiment').execute(client,message,distube,Discord);
    }
}
    }
}