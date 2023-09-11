const Discord = require('discord.js');
const bot = new Discord.Client({ intents: ['GUILD_MEMBERS', 'GUILD_VOICE_STATES'] }); // Les intents sont nécessaires pour suivre les changements d'état vocal
const config = require('./config.js');

bot.login(config.token);

bot.on("ready", async () => {
    console.log(`${bot.user.tag} est bien en ligne !`);
});

bot.on("voiceStateUpdate", (oldState, newState) => {
    // Vérifiez si l'utilisateur est passé d'un état non connecté à un salon vocal à un état connecté
    if (!oldState.channel && newState.channel) {
        // Vérifiez si l'utilisateur a des amis en ligne dans le même salon vocal
        const friendsOnline = newState.channel.members.filter(member => member.presence.status === 'online' && member.user.id !== newState.member.user.id);
        
        if (friendsOnline.size > 0) {
            // Envoie un message privé à l'utilisateur
            newState.member.send("Un de vos amis s'est connecté à un salon vocal !");
        }
    }
});
