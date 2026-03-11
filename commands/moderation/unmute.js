const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('🔊 Némítás feloldása')
    .addUserOption(option => option.setName('user').setDescription('A felhasználó').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const member = interaction.guild.members.cache.get(user.id);
    if (!member) return interaction.reply({ content: '❌ Felhasználó nem található!', ephemeral: true });
    await member.timeout(null);
    const embed = new EmbedBuilder()
      .setTitle('🔊 Unmute')
      .setDescription(`${user} némítása feloldva!`)
      .setColor('#00FF00')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};