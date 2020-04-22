// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

const music = require('../utils/music');

module.exports = (client, oldState, newState) => {
    if(newState.channelID != oldState.channelID) {
        let guild = music.getGuild(newState.guild.id);

        if(guild.playing && guild.voiceChannel.id == oldState.channelID) {
            console.log(newState.id + ' left VC, in which Woomy is playing music');
        };
    }
}  