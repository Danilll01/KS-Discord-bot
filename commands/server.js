module.exports = {
	name: 'server',
	description: 'Prints server name and total users',
	execute(message, args) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};