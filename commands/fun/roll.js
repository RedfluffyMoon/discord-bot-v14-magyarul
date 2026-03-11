const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('🎲 Dobj egy kockát!')
    .addIntegerOption(option =>
      option.setName('sides').setDescription('Oldalak száma (alapértelmezett: 6)').setRequired(false).setMinValue(2).setMaxValue(1000)
    ),

  async execute(interaction) {
    const sides = interaction.options.getInteger('sides') || 6;
    const result = Math.floor(Math.random() * sides) + 1;
    const embed = new EmbedBuilder()
      .setTitle('🎲 Kockadobás')
      .setDescription(`Dobtál egy **${sides}** oldalú kockával és... **${result}** lett!`)
      .setColor('#FFD700')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
