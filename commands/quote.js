module.exports = {
	name: 'quote',
	description: 'Prints out a random quote',
	execute(message, args) {
        // Gets all quotes and parses them to a more fittting format (copied from KS random quote website).
		function getQuotesFromJSON(path) {
            var quotes = [];
            // Index of non quotes
            var deleteQuotes = [0, 2, 3, 4, 6, 7, 9, 10, 14, 15, 16, 17, 27, 34, 35, 36];
            var deleteQuotesIndex = 0;
        
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var request = new XMLHttpRequest();
            request.open("GET", path, false);
            request.send(null);
            var qutoesJSON = JSON.parse(request.responseText);
        
            for(var i = 0; i < qutoesJSON.messages.length; i++){
                if(i === deleteQuotes[deleteQuotesIndex]){
                    deleteQuotesIndex++;
                    continue;
                }
        
                var authorName = qutoesJSON.messages[i].author.name;
                var authorImg = qutoesJSON.messages[i].author.avatarUrl;
        
                var multipleQuotes = qutoesJSON.messages[i].content.replace(/\n\n/g, '\n').split('\n');
                for (var j = 0; j < multipleQuotes.length; j++){
                    var quote = {};
                    quote['message'] = multipleQuotes[j];
                    quote['authorName'] = authorName;
                    quote['authorImg'] = authorImg;
                    quote['reactions'] = qutoesJSON.messages[i].reactions;
                    quotes.push(quote);
                }
            }
            return quotes;
        }
        
        function getRandomQuote(){
            return quotes[Math.floor(Math.random() * quotes.length)];
        }
        
        // Get all quotes
        const quotes = getQuotesFromJSON('https://danilll01.github.io/KSquotes/js/quotes.json');
        
        message.channel.send("***" + getRandomQuote().message + "***");
	},
};