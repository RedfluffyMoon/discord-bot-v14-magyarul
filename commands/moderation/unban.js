const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('✅ Ban feloldása')
    .addStringOption(option => option.setName('userid').setDescription('A felhasználó ID-ja').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const userId = interaction.options.getString('userid');
    await interaction.guild.members.unban(userId);
    const embed = new EmbedBuilder()
      .setTitle('✅ Unban')
      .setDescription(`<@${userId}> banja feloldva!`)
      .setColor('#00FF00')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};