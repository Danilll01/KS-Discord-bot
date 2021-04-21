// Require the discord.js module
const Discord = require('discord.js');

// Create a new Discord client
const client = new Discord.Client();

// When the client is ready, run this code
// This event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

const dotenv = require('dotenv');
dotenv.config();

// login to Discord with your app's token
client.login(process.env.TOKEN);

// Prefix
const prefix = "?"

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

	if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send('Pong.');
    } else if (message.content.startsWith(`${prefix}beep`)) {
        message.channel.send('Boop.');
    } else if (message.content === `${prefix}server`) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    } else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
    
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    } else if (command === 'kick') {
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to kick them!');
        }

        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = message.mentions.users.first();
    
        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }
});