const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('password')
    .setDescription('🔐 Véletlenszerű jelszó generálás!')
    .addIntegerOption(option =>
      option.setName('length').setDescription('Jelszó hossza (alapértelmezett: 16)').setRequired(false).setMinValue(4).setMaxValue(64)
    ),

  async execute(interaction) {
    const length = interaction.options.getInteger('length') || 16;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const embed = new EmbedBuilder()
      .setTitle('🔐 Jelszó generálva!')
      .setDescription(`\`${password}\``)
      .setFooter({ text: 'Ne feledd: ezt csak te látod!' })
      .setColor('#FF4500')
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
