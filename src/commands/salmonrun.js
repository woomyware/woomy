const Discord = require("discord.js");
const BasePaginator = require('discord-paginator.js');
const fetch = require('node-fetch');
const prettifyMiliseconds = require('pretty-ms');


exports.run = async (client, message, args) =>{
    fetch('https://splatoon2.ink/data/coop-schedules.json',  { headers: { 'User-Agent': client.config.userAgent }})
        .then(res => res.json())
        .then(json => {
            fetch('https://splatoon2.ink/data/timeline.json',  { headers: { 'User-Agent': client.config.userAgent }})
                .then(timelineRes => timelineRes.json())
                .then(timelineJson => {

                    const embeds = [];

                    if ((json.details[0].start_time * 1000) > Date.now() === true) {
                        embeds.push(
                            new Discord.MessageEmbed()
                                .setTitle('Upcoming Salmon Run')
                                .setColor(client.embedColour(message))
                                .setImage('https://splatoon2.ink/assets/splatnet/'+json.details[0].stage.image)
                                .addField('Map', json.details[0].stage.name, true)
                                .setFooter(`Page 1/2 | Starting in ${prettifyMiliseconds(json.details[0].start_time * 1000 - Date.now(), { secondsDecimalDigits: 0 })} | Data provided by splatoon2.ink`)
                        );
                    } else {
                        embeds.push(
                            new Discord.MessageEmbed()
                                .setTitle('Current Salmon Run')
                                .setColor(client.embedColour(message))
                                .setThumbnail('https://splatoon2.ink/assets/splatnet'+timelineJson.coop.reward_gear.gear.image)
                                .setImage('https://splatoon2.ink/assets/splatnet/'+json.details[0].stage.image)
                                .addField('Map', json.details[0].stage.name, true)
                                .addField('Reward Gear', timelineJson.coop.reward_gear.gear.name, true)
                                .addField('Weapons', json.details[0].weapons[0].weapon.name+', '+json.details[0].weapons[1].weapon.name+', '+json.details[0].weapons[2].weapon.name+', '+json.details[0].weapons[3].weapon.name)
                                .setFooter(`Page 1/2 | Ending in ${prettifyMiliseconds((json.details[0].end_time * 1000) - Date.now(), { secondsDecimalDigits: 0 })} | Data provided by splatoon2.ink`)
                        );
                    }

                    embeds.push(
                        new Discord.MessageEmbed()
                            .setTitle('Upcoming Salmon Run')
                            .setColor(client.embedColour(message))
                            .setImage('https://splatoon2.ink/assets/splatnet/'+json.details[1].stage.image)
                            .addField('Map', json.details[1].stage.name, true)
                            .addField('Weapons', json.details[1].weapons[1].weapon.name+', '+json.details[1].weapons[1].weapon.name+', '+json.details[1].weapons[2].weapon.name+', '+json.details[1].weapons[3].weapon.name)
                            .setFooter(`Page 2/2 | Starting in ${prettifyMiliseconds(json.details[1].start_time * 1000 - Date.now(), { secondsDecimalDigits: 0 })} | Data provided by splatoon2.ink`)
                    );
                        
                    const Paginator = new BasePaginator({
                        pages: embeds,
                        timeout: 120000,
                        filter: (reaction, user) => user.id == message.author.id //to filter the reaction collector
                    })

                    Paginator.spawn(message.channel)
                });
            })
            .catch(err => {
                message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`);
            });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User",
    requiredPerms: []
    };

exports.help = {
    name: "salmonrun",
    category: "Splatoon",
    description: "Get current map, weapons and gear for salmon run.",
    usage: "salmonrun"
    };
