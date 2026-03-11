const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('boostinfo')
    .setDescription('💎 Szerver boost információk'),

  async execute(interaction) {
    const guild = interaction.guild;

    const embed = new EmbedBuilder()
      .setTitle('💎 Boost Információk')
      .setThumbnail(guild.iconURL())
      .addFields(
        { name: '💎 Boost szint', value: `${guild.premiumTier}`, inline: true },
        { name: '🚀 Boostok száma', value: `${guild.premiumSubscriptionCount || 0}`, inline: true },
        { name: '👥 Boosterek', value: `${guild.members.cache.filter(m => m.premiumSince).size}`, inline: true },
      )
      .setColor('#FF73FA')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
