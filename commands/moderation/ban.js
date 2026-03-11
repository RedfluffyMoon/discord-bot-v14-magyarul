const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('🔨 Felhasználó bannolása')
    .addUserOption(option => option.setName('user').setDescription('A felhasználó').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Ok').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Nincs megadva';
    const member = interaction.guild.members.cache.get(user.id);
    if (!member) return interaction.reply({ content: '❌ Felhasználó nem található!', ephemeral: true });
    await member.ban({ reason });
    const embed = new EmbedBuilder()
      .setTitle('🔨 Ban')
      .setDescription(`${user} bannolva lett!\n**Ok:** ${reason}`)
      .setColor('#FF0000')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};