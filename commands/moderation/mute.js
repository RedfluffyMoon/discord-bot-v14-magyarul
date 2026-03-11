const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('🔇 Felhasználó némítása')
    .addUserOption(option => option.setName('user').setDescription('A felhasználó').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Ok').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Nincs megadva';
    const member = interaction.guild.members.cache.get(user.id);
    if (!member) return interaction.reply({ content: '❌ Felhasználó nem található!', ephemeral: true });
    await member.timeout(60 * 60 * 1000, reason);
    const embed = new EmbedBuilder()
      .setTitle('🔇 Mute')
      .setDescription(`${user} némítva lett 1 órára!\n**Ok:** ${reason}`)
      .setColor('#FFA500')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};