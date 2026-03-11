const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { version } = require('discord.js');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('🤖 Bot információk'),

  async execute(interaction) {
    const client = interaction.client;
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const embed = new EmbedBuilder()
      .setTitle('🤖 Bot Információk')
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        { name: '🏷️ Név', value: client.user.tag, inline: true },
        { name: '🆔 ID', value: client.user.id, inline: true },
        { name: '📅 Létrehozva', value: `<t:${Math.floor(client.user.createdTimestamp / 1000)}:F>`, inline: false },
        { name: '⏱️ Uptime', value: `${days}n ${hours}ó ${minutes}p ${seconds}mp`, inline: true },
        { name: '🏓 Ping', value: `${client.ws.ping}ms`, inline: true },
        { name: '📡 Szerverek', value: `${client.guilds.cache.size}`, inline: true },
        { name: '👥 Felhasználók', value: `${client.users.cache.size}`, inline: true },
        { name: '📦 Discord.js', value: `v${version}`, inline: true },
        { name: '🟢 Node.js', value: `${process.version}`, inline: true },
        { name: '💾 RAM használat', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
        { name: '🖥️ Platform', value: os.platform(), inline: true },
      )
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};