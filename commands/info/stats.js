const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { version } = require('discord.js');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('📊 Bot statisztikák'),

  async execute(interaction) {
    const client = interaction.client;
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const totalChannels = client.channels.cache.size;
    const totalRoles = client.guilds.cache.reduce((acc, g) => acc + g.roles.cache.size, 0);
    const totalEmojis = client.emojis.cache.size;
    const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const ramTotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

    const embed = new EmbedBuilder()
      .setTitle('📊 Bot Statisztikák')
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        { name: '🏓 Ping', value: `${client.ws.ping}ms`, inline: true },
        { name: '⏱️ Uptime', value: `${days}n ${hours}ó ${minutes}p ${seconds}mp`, inline: true },
        { name: '📡 Szerverek', value: `${client.guilds.cache.size}`, inline: true },
        { name: '👥 Felhasználók', value: `${client.users.cache.size}`, inline: true },
        { name: '📢 Csatornák', value: `${totalChannels}`, inline: true },
        { name: '🎭 Szerepkörök', value: `${totalRoles}`, inline: true },
        { name: '😀 Emojik', value: `${totalEmojis}`, inline: true },
        { name: '💾 RAM', value: `${ramUsed} MB / ${ramTotal} GB`, inline: true },
        { name: '📦 Discord.js', value: `v${version}`, inline: true },
        { name: '🟢 Node.js', value: `${process.version}`, inline: true },
        { name: '🖥️ Platform', value: os.platform(), inline: true },
        { name: '🏗️ Architektúra', value: os.arch(), inline: true },
      )
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};