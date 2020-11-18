const Discord = require('discord.js');
const cron = require('cron');
const ytdl = require("ytdl-core");

const client = new Discord.Client();
const PREFIX = "🥚"
const SHAUNPACE = "450287369766305822"
let prev_no = -10;

const SHAUNPACESWEARWORDS = ["F'ghoxx kemm ghandek Shaun Pace", "Kemm se nahralek fl'ikel Shaun Pace",
                             "nirak tikser saqajk minghajr il good luck Shaun Pace", "Zobb F'ghoxx l-israel",
                             "Prosit Mintoff", "Jien James Balzan Sultana Laburist u proud", "Kemm ma nahmlux il shaun Pace",
                             "Ghalaqlu Jan Sammut", "JeremyJoe qahbu", "Jake mhix schizo", "Got Slurp? 🍧",
                             "All my homies hate shaun pace", "My name Jeff", "MCAST mhix skola tal injoranti 🙈",
                             "Junior college dumb dumbs", "Marcus Mercieca sex of the universe", "Miirko Sant",
                             "Matthew Mifsud.", "me don't likey Shaun Pace 😡", "🤠", "#feelingGrateful😊",
                             "Raiden Psaila l king ta jc", "F'Raiden nafdaw", "Il Wapow"]
const JBSVIDEOS = ["https://www.youtube.com/watch?v=uCTqD250PJc", "https://www.youtube.com/watch?v=QibX1u5cZS4",
                   "https://www.youtube.com/watch?v=Je6GcMjpCC8", "https://www.youtube.com/watch?v=Hxx1uP1ECuw",
                   "https://www.youtube.com/watch?v=WaDtfMct0Bs", "https://www.youtube.com/watch?v=Xnu65Zbn7hk",
                   "https://www.youtube.com/watch?v=7S-sWp4dgrU", "https://www.youtube.com/watch?v=T8giIEdc8E0",
                   "https://www.youtube.com/watch?v=G2462O1z3A0", "https://www.youtube.com/watch?v=FGUs_VD3VZg",
                   "https://www.youtube.com/watch?v=ldo604_63NQ", "https://www.youtube.com/watch?v=0i1VyZwp0a8",
                   "https://www.youtube.com/watch?v=WWmIXGKg8g0", "https://www.youtube.com/watch?v=WWmIXGKg8g0"]

function getNumber() {
    var min = 0;
    var max = JBSVIDEOS.length;
    var i;
    i = Math.floor(Math.random() * (max - min)) + min;
    while (i == prev_no) {
        i = Math.floor(Math.random() * (max - min)) + min;
        prev_no = i;
    }

    return i;
};
client.on('ready', () => {

    console.log('I am ready!');

});

let scheduledMessage = new cron.CronJob('0,30 06-23 * * *', () => {
    let channel = client.channels.cache.get('404664933452873732');
    channel.send(SHAUNPACESWEARWORDS[Math.floor(Math.random() * SHAUNPACESWEARWORDS.length)]);
});
let scheduledMessage2 = new cron.CronJob('0,30 00-2 * * *', () => {
    let channel = client.channels.cache.get('404664933452873732');
    channel.send(SHAUNPACESWEARWORDS[Math.floor(Math.random() * SHAUNPACESWEARWORDS.length)]);
});

scheduledMessage.start()


client.on('message', async (msg) => {
    var args = msg.content.substring(PREFIX.length).split(" ");

    if (msg.author.equals(client.user)) return;
    if (msg.content.startsWith(PREFIX)) {
        switch (args[0].toLowerCase()) {
            case "mute":
                if (!msg.mentions.users.first()) return msg.channel.send("you need to mention somebody!!");

                const voting = new Discord.MessageEmbed()
                    .setColor('#42b34d')
                    .setFooter('Mute ' + msg.mentions.users.first().tag + ' for 15m?')
                    .setImage(msg.mentions.users.first().avatarURL);
                const role = msg.guild.roles.cache.find(r => r.name === 'Muted');
                if (!role) return msg.channel.send('No Role was found, please make sure you have a muted role.');
                const agree = "✅"
                const disagree = "❌"
                const sentEmbed = await msg.channel.send(voting);
                const filter = (reaction, user) => (reaction.emoji.name === agree || reaction.emoji.name === disagree) && !user.bot;
                await sentEmbed.react(agree);
                await sentEmbed.react(disagree);

                const voteStatus = await msg.channel.send('Voting started 30 seconds left');
                const collected = await sentEmbed.awaitReactions(filter, { time: 30000 });
                const agreed = collected.get(agree) || { count: 1 };
                const disagreed = collected.get(disagree) || { count: 1 };
                const agreed_count = agreed.count;
                const disagreed_count = disagreed.count;
                voteStatus.edit('Voting ended with: ' + agreed_count + agree + ' and ' + disagreed_count + disagree);
                if (agreed.count > disagreed.count) {
                    await msg.guild.member(msg.mentions.users.first()).roles.add(role);
                    if (msg.guild.member(msg.mentions.users.first()).voice.channel)
                        await msg.guild.member(msg.mentions.users.first()).voice.setMute(true);
                    setInterval(function () {
                        console.log("unmuting: " + msg.mentions.users.first());
                        if (msg.guild.member(msg.mentions.users.first()).voice.channel) {
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
            case "leave":
                if (msg.member.voice.channel) {
                    msg.member.voice.channel.leave()
                }
                else {
                    msg.reply("You are not in a voice channel!")
                }
                break;
        }
    }
    else if (msg.content.startsWith('<:JamesPog:')) {
        if (msg.member.voice.channel) {
            cur_channel = msg.member.voice.channel;
            let connection = await cur_channel.join()
            let dispatcher = await connection.play(ytdl(JBSVIDEOS[getNumber()], { filter: 'audioonly' }))
            dispatcher.on('finish', _end => { cur_channel.leave() });
        }
        else {
            msg.reply("You have to be in a voice channel!")
        }
    }
    if (msg.author.id === SHAUNPACE || msg.author.id === "645205466066059264"){
        shaun_reactions = ["🇫", "🇬", "🇭", "⭕", "✖️", "🇽", "🇴", "🇲", "Ⓜ️", "🅾️", "🇰"];
        for (x in shaun_reactions){
            msg.react(x);
        }
    }
});


// THIS  MUST  BE  THIS  WAY
console.log("Logging in...")
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret