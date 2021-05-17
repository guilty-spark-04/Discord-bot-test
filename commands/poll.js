module.exports = {
    name: 'poll',
    description: 'creates a poll',
    async execute(Discord,message){
        var saymsg = message.content.replace("$poll", "");
        var name = message.author.username;
        const elembed = new Discord.MessageEmbed()
        .setTitle(name + "'s  Poll")
        .addField("  ✅", "Yes", true)
        .addField(" 😐","meh",true)
        .addField("  ❌", "No ❤️",true)
        .setDescription(saymsg)
        .setThumbnail(message.author.avatarURL())
        .setColor(0x9750e1)
        .setFooter("Provided to u by raid shadow legends","https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fen.meming.world%2Fimages%2Fen%2Fthumb%2F8%2F8e%2FSad_Linus.jpg%2F300px-Sad_Linus.jpg&f=1&nofb=1")
        .setTimestamp();
        try{
        await message.channel.send({embed: elembed}).then(embedMessage => {
            embedMessage.react("✅");
            embedMessage.react("😐");
            embedMessage.react("❌");
        });
    } catch{
        message.reply("Something went wrong");
    }
    }
}