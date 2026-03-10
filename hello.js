// commands/general/hello.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('👋 Üdvözöl a bot'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('👋 Helló!')
      .setDescription(`Szia ${interaction.user}! Örülök, hogy itt vagy! 😊`)
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
