const Discord = require("discord.js");
const BasePaginator = require('discord-paginator.js');
const fetch = require('node-fetch');
const prettifyMiliseconds = require('pretty-ms');


exports.run = async (client, message, args) =>{
    fetch('https://splatoon2.ink//data/merchandises.json',  { headers: { 'User-Agent': client.config.userAgent }})
        .then(res => res.json())
        .then(json => {
            const embeds = [];

            for ( let i = 0; i < json.merchandises.length; i++ ) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(json.merchandises[i].gear.name)
                    .setThumbnail('https://splatoon2.ink/assets/splatnet' + json.merchandises[i].gear.image)
                    .setColor(client.embedColour(message))
                    .addField('Price', (json.merchandises[i].price).toString(), true)
                    .addField('Brand', json.merchandises[i].gear.brand.name, true)
                    .addField('Ability Slots', (json.merchandises[i].gear.rarity + 1).toString(), true)
                    .addField('Main Ability', json.merchandises[i].skill.name, true)
                    .addField('Common Ability', json.merchandises[i].gear.brand.frequent_skill.name, true)
                    .setFooter(`Page ${i+1}/${json.merchandises.length} | Out of stock in ${prettifyMiliseconds(json.merchandises[i].end_time * 1000 - Date.now())} | Data provided by splatoon2.ink`);
                embeds.push(embed);
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
    aliases: [],
    permLevel: "User",
    requiredPerms: []
    };

exports.help = {
    name: "splatnet",
    category: "Splatoon",
    description: "Get current and upcoming maps and modes for regular, ranked and league battles.",
    usage: "splatoonmaps"
    };
