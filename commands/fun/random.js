const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('🎲 Véletlenszerű szám generálás!')
    .addIntegerOption(option =>
      option.setName('min').setDescription('Minimum szám').setRequired(false)
    )
    .addIntegerOption(option =>
      option.setName('max').setDescription('Maximum szám').setRequired(false)
    ),

  async execute(interaction) {
    const min = interaction.options.getInteger('min') ?? 1;
    const max = interaction.options.getInteger('max') ?? 100;

    if (min >= max) {
      return interaction.reply({ content: '❌ A minimum szám kisebb kell legyen a maximumnál!', ephemeral: true });
    }

    const result = Math.floor(Math.random() * (max - min + 1)) + min;

    const embed = new EmbedBuilder()
      .setTitle('🎲 Véletlenszerű Szám')
      .setDescription(`**${result}**`)
      .addFields(
        { name: '📉 Minimum', value: `${min}`, inline: true },
        { name: '📈 Maximum', value: `${max}`, inline: true },
      )
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};