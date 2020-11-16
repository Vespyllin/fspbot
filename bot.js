const Discord = require('discord.js');
const cron = require('cron');

const client = new Discord.Client();
const prefix = "🥚"
const SHAUNPACE = "450287369766305822"

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', async(message) => {
    var args = msg.content.substring(PREFIX.length).split(" ");

    function wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms){
            end = new Date().getTime();
        }
    }

    if(msg.author.equals(client.user)) return;
    if(!msg.content.startsWith(PREFIX)) return;
    switch(args[0].toLowerCase()) {
        case "mute":
            const role = msg.guild.roles.find(r => r.name === 'Muted');
            if(msg.mentions.members.first().roles.has(role.id)) return

            if(!msg.mentions.users.first()) return msg.channel.send("you need to mention somebody!!");

            const voting = new Discord.RichEmbed()
                                      .setColor('#42b34d')
                                      .setFooter('Mute ' + msg.mentions.users.first().tag + ' for 15m?')
                                      .setImage(msg.mentions.users.first().avatarURL);
            if (!role) return msg.channel.send('No Role was found, please make sure you have a muted role.')
            const agree = "✅"
            const disagree ="❌"

            const sentEmbed = await msg.channel.send(voting);
            const filter = (reaction, user) => (reaction.emoji.name === agree || reaction.emoji.name === disagree) && !user.bot;
            await sentEmbed.react(agree);
            await sentEmbed.react(disagree);

            const voteStatus = await msg.channel.send('Voting started 30 seconds left');
            const collected = await sentEmbed.awaitReactions(filter, {time : 5000});
            const agreed = collected.get(agree) || {count: 1};
            const disagreed = collected.get(disagree) || {count : 1};
            const agreed_count = agreed.count - 1;
            const disagreed_count = disagreed.count - 1;
            voteStatus.edit('Voting ended with: ' + agreed_count + agree + ' and ' + disagreed_count + disagree);
            if (agreed.count > disagreed.count) {
                await msg.guild.member(msg.mentions.users.first()).addRole(role)
                await wait(900000);
                await msg.guild.member(msg.mentions.users.first()).removeRole(role)
            }   
            else {
                msg.channel.send('Mute Voting Failed 🥚')
            }
















    }
});
 

// THIS  MUST  BE  THIS  WAY
console.log("Logging in...")
client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret