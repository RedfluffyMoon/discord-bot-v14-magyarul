// commands/general/help.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('📋 Parancsok listája'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📋 Parancsok listája')
      .setColor('#5865F2')
      .addFields(
        { name: '🟢 General', value: '/hello, /ping, /help, /invite, /say, /afk, /avatar, /banner, /serverinfo, /userinfo' },
        { name: '🔨 Moderation', value: '/ban, /unban, /kick, /mute, /unmute, /warn, /warnings, /clearwarnings, /purge, /slowmode' },
        { name: '🎮 Fun', value: '/meme, /joke, /8ball, /roll, /coinflip, /rps, /trivia, /roast, /compliment, /ship, /would-you-rather, /truth, /dare, /random, /quote' },
        { name: '🛠️ Utility', value: '/poll, /remind, /timer, /translate, /weather, /calculator, /qrcode, /shorten, /color, /timestamp, /base64, /password' },
        { name: 'ℹ️ Info', value: '/botinfo, /roleinfo, /channelinfo, /emojiinfo, /membercount, /boostinfo, /uptime, /stats' }
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
