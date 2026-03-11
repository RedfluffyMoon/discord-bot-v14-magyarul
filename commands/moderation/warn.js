const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

const warnings = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('⚠️ Felhasználó figyelmeztetése')
    .addUserOption(option => option.setName('user').setDescription('A felhasználó').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Ok').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Nincs megadva';
    const userId = user.id;
    if (!warnings.has(userId)) warnings.set(userId, []);
    warnings.get(userId).push(reason);
    const embed = new EmbedBuilder()
      .setTitle('⚠️ Warn')
      .setDescription(`${user} figyelmeztetést kapott!\n**Ok:** ${reason}\n**Összes warn:** ${warnings.get(userId).length}`)
      .setColor('#FFA500')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};