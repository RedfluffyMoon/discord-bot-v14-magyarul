const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timestamp')
    .setDescription('🕐 Unix időbélyeg generálása!')
    .addStringOption(option =>
      option.setName('date').setDescription('Dátum (YYYY-MM-DD HH:MM formátumban)').setRequired(false)
    ),

  async execute(interaction) {
    const input = interaction.options.getString('date');
    let date;

    if (input) {
      date = new Date(input);
      if (isNaN(date.getTime())) {
        return interaction.reply({ content: '❌ Érvénytelen dátum formátum! Példa: `2024-12-31 23:59`', ephemeral: true });
      }
    } else {
      date = new Date();
    }

    const unix = Math.floor(date.getTime() / 1000);

    const embed = new EmbedBuilder()
      .setTitle('🕐 Unix Időbélyeg')
      .addFields(
        { name: '📅 Dátum', value: date.toUTCString(), inline: false },
        { name: '🔢 Unix időbélyeg', value: `\`${unix}\``, inline: true },
        { name: '💬 Discord formátum', value: `\`<t:${unix}:F>\``, inline: true },
        { name: '👁️ Előnézet', value: `<t:${unix}:F>`, inline: false },
      )
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};