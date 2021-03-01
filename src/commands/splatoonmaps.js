const Discord = require("discord.js");
const BasePaginator = require('discord-paginator.js');
const fetch = require('node-fetch');
const prettifyMiliseconds = require('pretty-ms');


exports.run = async (client, message, args) =>{
    fetch('https://splatoon2.ink/data/schedules.json', { headers: { 'User-Agent': client.config.userAgent }})
            .then(res => res.json())
            .then(json => {

                const embeds = [
                    new Discord.MessageEmbed()
                        .setTitle('Current Splatoon 2 Maps')
                        .setColor(client.embedColour(message))
                        .addField('<:turf_war:814651383911153692> Turf War', `${json.regular[0].stage_a.name}\n${json.regular[0].stage_b.name}`, true)
                        .addField(`<:ranked:814651402479468544> Ranked: ${json.gachi[0].rule.name}`, `${json.gachi[0].stage_a.name}\n${json.gachi[0].stage_b.name}`, true)
                        .addField(`<:league:814651415409590363> League: ${json.league[0].rule.name}`, `${json.league[0].stage_a.name}\n${json.league[0].stage_b.name}`, true)
                        .setFooter(`Page 1/${json.regular.length} | Maps changing in ${prettifyMiliseconds(json.league[0].end_time * 1000 - Date.now(), { secondsDecimalDigits: 0 })} | Data provided by splatoon2.ink`)
                ];

                for ( let i = 1; i < json.regular.length; i++ ) {
                    embeds.push(
                        new Discord.MessageEmbed()
                            .setTitle('Upcoming Splatoon 2 Maps')
                            .setColor(client.embedColour(message))
                            .addField('<:turf_war:814651383911153692> Turf War', `${json.regular[i].stage_a.name}\n${json.regular[i].stage_b.name}`, true)
                            .addField(`<:ranked:814651402479468544> Ranked: ${json.gachi[i].rule.name}`, `${json.gachi[i].stage_a.name}\n${json.gachi[i].stage_b.name}`, true)
                            .addField(`<:league:814651415409590363> League: ${json.league[i].rule.name}`, `${json.league[i].stage_a.name}\n${json.league[i].stage_b.name}`, true)
                            .setFooter(`Page ${i+1}/${json.regular.length} | Available in ${prettifyMiliseconds(json.league[i].start_time * 1000 - Date.now(), { secondsDecimalDigits: 0 })} | Data provided by splatoon2.ink`)
                    );
                }

                const Paginator = new BasePaginator({
                    pages: embeds,
                    timeout: 120000,
                    filter: (reaction, user) => user.id == message.author.id //to filter the reaction collector
                })

                Paginator.spawn(message.channel)
            })
            .catch(err => {
                message.channel.send(`<:error:466995152976871434> An error has occurred: ${err}`);
            });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['splatoonmodes'],
    permLevel: "User",
    requiredPerms: []
    };

exports.help = {
    name: "splatoonmaps",
    category: "Splatoon",
    description: "Get current and upcoming maps and modes for regular, ranked and league battles.",
    usage: "splatoonmaps"
    };
