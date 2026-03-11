const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

const warnings = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('📋 Figyelmeztetések listája')
    .addUserOption(option => option.setName('user').setDescription('A felhasználó').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const userWarnings = warnings.get(user.id) || [];
    const embed = new EmbedBuilder()
      .setTitle(`📋 ${user.username} figyelmeztetései`)
      .setDescription(userWarnings.length ? userWarnings.map((w, i) => `${i + 1}. ${w}`).join('\n') : '✅ Nincs figyelmeztetés!')
      .setColor('#FFA500')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};