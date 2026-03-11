const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('🪙 Dobjon egy érmét!'),

  async execute(interaction) {
    const result = Math.random() < 0.5 ? '👑 Fej' : '🪙 Írás';
    const embed = new EmbedBuilder()
      .setTitle('🪙 Érmefeldob')
      .setDescription(`Az érme landolt: **${result}**!`)
      .setColor('#FFD700')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
