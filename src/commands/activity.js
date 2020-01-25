exports.run = (client, message, args) => {
  if(!args[0]) {
    return message.channel.send(`<:error:466995152976871434> No arguments! Usage: \`${client.commands.get(`activity`).help.usage}\``)
  }
  if(client.lockActivity == true) {
		activityLocked = "locked";
  } else {
    activityLocked = "unlocked";
	}
	
  if(args[0] == "lock" && !args[1]) {
    client.lockActivity = true;
    return message.channel.send(
      "<:success:466995111885144095> Activity has been locked will no longer change automatically."
    );
  };

  if(args[0] == "unlock" && !args[1]) {
    client.lockActivity = false;
    return message.channel.send(
			"<:success:466995111885144095> Activity has been unlocked and will begin changing automatically."
			);
  };

  client.lockActivity = true;
  client.user.setActivity(args.join(" "));
  message.channel.send(
		`<:success:466995111885144095> Activity locked and changed to \`${args.join(" ")}\`
		`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "Developer",
  requiredPerms: []
};

exports.help = {
	name: "activity",
	category: "Owner",
	description: "Changes the bot's activity and disables automatic changing of the activity",
	usage: "activity [activity] **OR** activity [lock/unlock]"
};
