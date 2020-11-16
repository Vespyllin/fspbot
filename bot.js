const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login("Nzc3ODEzNDc3NzI5MTA3OTg4.X7I5QA.jm_0AfBBqbpdnlwj-JrO_bEsO4c");//BOT_TOKEN is the Client Secret