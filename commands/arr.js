module.exports = {
	name: 'arr',
	description: 'Prints args',
	execute(message, args) {
        const exampleEmbed = {
            color: 0x0099ff,
            title: 'KS Minecraft arr!',
            description: 'Detta arret är ett nice arrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
            thumbnail: {
                url: 'https://github.com/Danilll01/KSquotes/img/KS_officiell_logga.png',
            },
            fields: [
                {
                    name: 'Vad?',
                    value: 'Ett KS arr!',
                },
                {
                    name: 'När?',
                    value: '11 november kl 04:20',
                },
                {
                    name: 'Var?',
                    value: 'I KS lokal nära dig',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: 'Lades upp',
            },
        };
        
        message.channel.send({ embed: exampleEmbed });
	},
};

/* const exampleEmbed = {
    color: 0x0099ff,
    title: 'Some title',
    url: 'https://discord.js.org',
    author: {
        name: 'Some name',
        icon_url: 'https://i.imgur.com/wSTFkRM.png',
        url: 'https://discord.js.org',
    },
    description: 'Some description here',
    thumbnail: {
        url: 'https://i.imgur.com/wSTFkRM.png',
    },
    fields: [
        {
            name: 'Regular field title',
            value: 'Some value here',
        },
        {
            name: '\u200b',
            value: '\u200b',
            inline: false,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
        {
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        },
    ],
    image: {
        url: 'https://i.imgur.com/wSTFkRM.png',
    },
    timestamp: new Date(),
    footer: {
        text: 'Some footer text here',
        icon_url: 'https://i.imgur.com/wSTFkRM.png',
    },
}; */