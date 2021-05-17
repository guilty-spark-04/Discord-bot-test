module.exports = {
    name: 'wow',
    description: 'prints out a compliment',
    async execute(client, message){
        var name = message.author.username;
        var message2;
        var num = Math.round(6*Math.random());
        switch(num){
            case 0:
                message2 = "Thanks "+ name +"! I could tell you really put effort into your speaking style! The speech was a little shorter than the guidelines though, so maybe talk a bit more about yourself. I'm sure we'd all like to get to know you better! Keep it up!";
                break;
            case 1:
                message2 = "I really liked the way that you used your hand gestures, they seemed very fluid and natural. Keep it up " + name+"!";
                break;
            case 2:
                message2 = "Your speaking seems very refined, and it's especially shown in your smooth transitions. You should give a little more thought to your hand gestures; while you move your hands a lot, the shape of your hands seems to stay static throughout the speech. Overall the content in your speech was great!";
                break;
            case 3:
                message2 = "You have a very natural and conversational speaking style. Your speech seems very friendly without compromising its professionalism. Keep it up " + name +"!";
                break;
            case 4:
                message2 = "Hey, " + name +"! You have a relaxed speaking style which is nice to listen to, but you should pay attention to the visual aspect of your speech. The main thing that stuck out to me was how half your body was turned away from the camera. Try to fully face the audience so you exude more confidence!"
                break;
            case 5:
                message2 = "Wow, that was amazing! You just seemed so natural and confident in yourself! I loved listening to your speech, and I'll be looking forward to more!";
                break;
        }
        await message.channel.send(message2);
    }
}