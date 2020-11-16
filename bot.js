const Discord = require('discord.js');
const cron = require('cron');
const ytdl = require("ytdl-core");

const client = new Discord.Client();
const PREFIX = "🥚"
const SHAUNPACE = "450287369766305822"

const SHAUNPACESWEARWORDS = ["F'ghoxx kemm ghandek Shaun Pace", "Kemm se nahralek fl'ikel Shaun Pace", "nirak tikser saqajk minghajr il good luck Shaun Pace", "Zobb F'ghoxx l-israel"]
const JBSVIDEOS = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"]
client.on('ready', () => {

    console.log('I am ready!');

});

let scheduledMessage = new cron.CronJob('0,30 * * * *', () => {
    let channel = client.channels.get('404664933452873732');
    channel.send(SHAUNPACESWEARWORDS[Math.floor(Math.random() * SHAUNPACESWEARWORDS.length)]);
});

scheduledMessage.start()
 

client.on('message', async(msg) => {
    var args = msg.content.substring(PREFIX.length).split(" ");

    if(msg.author.equals(client.user)) return;
    if(!msg.content.startsWith(PREFIX) || !msg.content.startsWith('<:JamesPog:')) return;
    switch(args[0].toLowerCase()) {
        case "mute":
            if(!msg.mentions.users.first()) return msg.channel.send("you need to mention somebody!!");

            const voting = new Discord.MessageEmbed()
                                      .setColor('#42b34d')
                                      .setFooter('Mute ' + msg.mentions.users.first().tag + ' for 15m?')
                                      .setImage(msg.mentions.users.first().avatarURL);
            const role = msg.guild.roles.cache.find(r => r.name === 'Muted');
            if (!role) return msg.channel.send('No Role was found, please make sure you have a muted role.');
            const agree = "✅"
            const disagree ="❌"
            const sentEmbed = await msg.channel.send(voting);
            const filter = (reaction, user) => (reaction.emoji.name === agree || reaction.emoji.name === disagree) && !user.bot;
            await sentEmbed.react(agree);
            await sentEmbed.react(disagree);

            const voteStatus = await msg.channel.send('Voting started 30 seconds left');
            const collected = await sentEmbed.awaitReactions(filter, {time : 30000});
            const agreed = collected.get(agree) || {count: 1};
            const disagreed = collected.get(disagree) || {count : 1};
            const agreed_count = agreed.count;
            const disagreed_count = disagreed.count;
            voteStatus.edit('Voting ended with: ' + agreed_count + agree + ' and ' + disagreed_count + disagree);
            if (agreed.count > disagreed.count) {
                await msg.guild.member(msg.mentions.users.first()).roles.add(role);
                if(msg.guild.member(msg.mentions.users.first()).voice.channel)
                    await msg.guild.member(msg.mentions.users.first()).voice.setMute(true);
                setInterval(function(){
                    console.log("unmuting" + msg.mentions.users.first());
                    if(msg.guild.member(msg.mentions.users.first()).voice.channel){
                        msg.guild.member(msg.mentions.users.first()).voice.setMute(false);
                    }
                    msg.guild.member(msg.mentions.users.first()).roles.remove(role);
                }, 900000);
            }   
            else {
                msg.channel.send('Mute Voting Failed 🥚')
            }
            break;
        case "jotime":
            msg.reply("https://www.facebook.com/elizabeth.pace.39")
            break;
    }
    if (msg.content.startsWith('<:JamesPog:')){
        console.log("Hey")
        let connection =  await msg.member.voiceChannel.join()
        let stream = ytdl(JBSVIDEOS[Math.floor(Math.random() * JBSVIDEOS.length)])
        let dispatcher = await connection.playStream(stream)
        dispatcher.on('end', _end => {MessageChannel.member.voiceChannel.leave()});
    }
});
 

// THIS  MUST  BE  THIS  WAY
console.log("Logging in...")
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret