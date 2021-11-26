module.exports = {
	name: 'hejdåtext',
	description: 'Prints lyrics for the famous hejdåsången',
	execute(message, args) {
		message.channel.send(lyric);
	},
};

let lyric = `
🎶**Hejdåsången ft. Nalle**🎶

Luna, hinner du sjunga hej då sången innan du går?
🎵
Ja, med största nöje
med sörsta nöje
🎵
Var mcket kul vi gjort.
🎵
Vad vi har hittat på.
Men tiden går så fort.
Nu är det dags att gå.
Hejdå, vi ses, adjö, farväl.
Godnatt, sov gott min än.
Var gad som jag,
🎵
för allt känns bra.
Ja jag vet att vi snart igen
(VI SS SNART IGEEEEN!).
🎵
Hejdå vi ses, adjö, farväl.
🎵
Och imorgon vill jag förstås
att vi får ha det minst lika bra,
och att du vill komma ch leka med oss,
och lka med oss,
🎵
och leka med oss.
Hejdå!`;