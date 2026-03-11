const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('⏱️ Bot uptime megjelenítése'),

  async execute(interaction) {
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const embed = new EmbedBuilder()
      .setTitle('⏱️ Bot Uptime')
      .setDescription(`A bot **${days}** nap, **${hours}** óra, **${minutes}** perc és **${seconds}** másodperce fut!`)
      .setColor('#00FF00')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
