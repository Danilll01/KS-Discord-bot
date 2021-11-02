// Require file system
const fs = require('fs');
var pathToFfmpeg = require('ffmpeg-static');

//import {playMusic, skip, stop} from './musicBot.js';
const musicBot = require('./musicBot.js');

// Require the discord.js module
const Discord = require('discord.js');

// Create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

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

// Queue for music
const queue = new Map();

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();


    const serverQueue = queue.get(message.guild.id);

    // Music commands
    if (command === 'play') {
        return musicBot.playMusic(message, serverQueue);
    } else if (command === 'skip') {
        musicBot.skip(message, serverQueue);
        return;
    } else if (command === 'stop') {
        musicBot.stop(message, serverQueue);
        return;
    } else if (command === 'hejdå') {
        message.content = "?play https://www.youtube.com/watch?v=-Ajrz3JPig0";
        return musicBot.playMusic(message, serverQueue)
    }

    // If command don't exist return.
    if (!client.commands.has(command)) return;

    try {
	    client.commands.get(command).execute(message, args);
    } catch (error) {
	    console.error(error);
	    message.reply('there was an error trying to execute that command!');
    }

	if (command === 'kick') {
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to kick them!');
        }
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = message.mentions.users.first();
    
        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }
});