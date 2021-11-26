const ytdl = require('ytdl-core');

async function playMusic(message, serverQueue, queue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );

  const permissions = voiceChannel.permissionsFor(message.client.user);
  // Check if bot can't connect to VC
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  // Get video from ytdl
  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 3,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(queue, message.guild, queueContruct.songs);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
    
  if (!serverQueue)
    return message.channel.send("There is no song that I could stop!");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}


function play(queue, guild) {
  const serverQueue = queue.get(guild.id);
  var songQueue = serverQueue.songs;

  // If no song is playing leave VC and delete queue
  if (songQueue.length === 0) {
    setTimeout(function(){
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
    }, 20000)
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(songQueue[0].url))
    .on("finish", () => {
      songQueue.shift();
      play(queue, guild);
    })
    .on("error", error => console.error(error));

  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Started playing: **${songQueue[0].title}**`);
}

function queue(message, serverQueue) {
  if (!serverQueue) {
    message.channel.send("Nothing is playing right now");
  } else {
    let songQueue = serverQueue.songs;
    let queueString = "";
    for (let i = 0; i < songQueue.length; i++) {
      queueString += `**${i + 1}. ** ${songQueue[i].title} \n`;
    }
    message.channel.send(queueString);
  }
}


exports.playMusic = playMusic;
exports.play = play;
exports.skip = skip;
exports.stop = stop;
exports.queue = queue;