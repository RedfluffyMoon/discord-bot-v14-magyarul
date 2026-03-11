const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('👢 Felhasználó kirúgása')
    .addUserOption(option => option.setName('user').setDescription('A felhasználó').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Ok').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Nincs megadva';
    const member = interaction.guild.members.cache.get(user.id);
    if (!member) return interaction.reply({ content: '❌ Felhasználó nem található!', ephemeral: true });
    await member.kick(reason);
    const embed = new EmbedBuilder()
      .setTitle('👢 Kick')
      .setDescription(`${user} kirúgva!\n**Ok:** ${reason}`)
      .setColor('#FFA500')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};