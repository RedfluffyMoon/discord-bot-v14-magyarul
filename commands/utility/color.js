const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('color')
    .setDescription('🎨 Szín információk lekérése!')
    .addStringOption(option =>
      option.setName('hex').setDescription('HEX szín kód (pl. #FF5733)').setRequired(true)
    ),

  async execute(interaction) {
    const hex = interaction.options.getString('hex').replace('#', '');
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      return interaction.reply({ content: '❌ Érvénytelen HEX szín kód! Példa: `#FF5733`', ephemeral: true });
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const embed = new EmbedBuilder()
      .setTitle('🎨 Szín Információk')
      .addFields(
        { name: '🔴 HEX', value: `#${hex.toUpperCase()}`, inline: true },
        { name: '🟢 RGB', value: `rgb(${r}, ${g}, ${b})`, inline: true },
        { name: '🔵 Decimális', value: `${parseInt(hex, 16)}`, inline: true },
      )
      .setColor(parseInt(hex, 16))
      .setThumbnail(`https://singlecolorimage.com/get/${hex}/100x100`)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};