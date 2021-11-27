const Discord = require('discord.js');
const got = require('got');
const axios = require('axios');

const baseURL = "https://www.reddit.com/r/";
const subreddits = ["meme","wholesomememes","me_irl","aww","wholesome"];

module.exports = {
	name: 'meme',
	description: 'Prints a random meme',
	async execute(message, args) {
        const embed = new Discord.MessageEmbed();
        let randSubreddit = subreddits[Math.floor(Math.random() * (subreddits.length-1))];
	    axios.get(baseURL + randSubreddit + '/hot/.json?limit=30')
		.then(response => {
			const posts = response.data.data.children;
            var post;
            
            do {
                post = posts[Math.floor(Math.random() * (posts.length-1))];
                console.log(post.data.over_18);
                console.log(post.data.url);
            } while (post.data.over_18 || (post.data.url.includes("comments")) || !(post.data.url.startsWith("https://i")));
            
			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;

			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setColor('RANDOM');
			embed.setImage(memeImage);
			embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

			message.channel.send(embed);
		})
		.catch(console.error);
	},
};