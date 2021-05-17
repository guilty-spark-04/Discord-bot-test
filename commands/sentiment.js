
module.exports = {
    name:'sentiment',
    description:'sentiment analysis',
    async execute(client,message,Discord){
        message.channel.send("Beginning analysis on " + message.author.username + "...This could take a bit of time");
        const spawn = require('child_process').spawn;
        var fs = require('fs');

        await lots_of_messages_getter(fs,message,message.channel,1000);

        var child = spawn('python', ['./commands/sentipy.py']);
        child.stderr.on('data',data =>{
            console.log(data.toString());
        });
        child.stdout.on('data', data=>{
            console.log(data.toString());
       });
       child.on('exit',function(code){
            console.log("child process exited with exit code "+code);
            message.channel.send({files: ["./commands/wordcloud.jpg"]})
       });
    }

}
async function lots_of_messages_getter(fs,message,channel, limit = 500) {
    console.log("gathering data");
    let last_id;
    let filename = "./commands/messages.txt";
    let is_first = true;
    let count = 0;
    let total = 0;

    while (true) {
        const options = { limit: 100 };
        if (last_id) {
            options.before = last_id;
        }

        const messages = await channel.messages.fetch(options);
        count+=messages.size;
        const msgs = messages.filter(m => m.author.id == message.author.id)
            msgs.forEach(mes => {
                if(is_first){
                    fs.writeFileSync(filename, mes.content + "\n");
                    is_first = false;
                    total+=1;
                }else{
                    fs.appendFileSync(filename, mes.content + "\n");
                    total+=1;
                }

            });
        last_id = messages.last().id;

        if (count < 100 || count >= limit) {
            break;
        }
    }
    await message.channel.send("Found " + total +" messages from you.");
}
