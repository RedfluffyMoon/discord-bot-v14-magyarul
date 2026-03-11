const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('🐢 Lassú mód beállítása')
    .addIntegerOption(option =>
      option.setName('seconds').setDescription('Másodpercek (0 = kikapcs)').setRequired(true).setMinValue(0).setMaxValue(21600)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const seconds = interaction.options.getInteger('seconds');
    await interaction.channel.setRateLimitPerUser(seconds);
    const embed = new EmbedBuilder()
      .setTitle('🐢 Slowmode')
      .setDescription(seconds === 0 ? '✅ Lassú mód kikapcsolva!' : `✅ Lassú mód beállítva: **${seconds} másodperc**`)
      .setColor('#FFA500')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};