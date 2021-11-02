module.exports = {
	name: 'info',
	description: 'Prints args',
	execute(message, args) {
        
        let infoData = require('./infoData.json');

        infoData.forEach(person => {
            const exampleEmbed = {
                color: 0x0099ff,
                title: 'Namn och nick',
                description: person.name + ", " + person.nick,
                thumbnail: {
                    url: 'https://danilll01.github.io/KSquotes/img/' + person.name + '_profilepic.jpg',
                },
                fields: [
                    {
                        name: 'Post',
                        value: person.post,
                    },
                    {
                        name: 'Året du började på Chalmers',
                        value: person.year,
                    },
                    {
                        name: 'Bästa citatet',
                        value: person.quote,
                    },
                ],
            };
            message.channel.send({ embed: exampleEmbed });
        });
	},
};