const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

const warnings = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearwarnings')
    .setDescription('🗑️ Figyelmeztetések törlése')
    .addUserOption(option => option.setName('user').setDescription('A felhasználó').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    warnings.delete(user.id);
    const embed = new EmbedBuilder()
      .setTitle('🗑️ Figyelmeztetések törölve')
      .setDescription(`${user} összes figyelmeztetése törölve!`)
      .setColor('#00FF00')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};