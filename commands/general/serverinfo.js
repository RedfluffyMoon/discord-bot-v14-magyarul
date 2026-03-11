const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('🏠 Szerver információk'),

  async execute(interaction) {
    const guild = interaction.guild;
    const embed = new EmbedBuilder()
      .setTitle(`🏠 ${guild.name} információi`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: '🆔 ID', value: guild.id, inline: true },
        { name: '👑 Tulajdonos', value: `<@${guild.ownerId}>`, inline: true },
        { name: '👥 Tagok', value: `${guild.memberCount}`, inline: true },
        { name: '📅 Létrehozva', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
        { name: '🚀 Boost szint', value: `${guild.premiumTier}`, inline: true },
        { name: '📢 Csatornák', value: `${guild.channels.cache.size}`, inline: true }
      )
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};