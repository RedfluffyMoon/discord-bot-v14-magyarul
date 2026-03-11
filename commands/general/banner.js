const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('banner')
    .setDescription('🎨 Banner megjelenítése')
    .addUserOption(option =>
      option.setName('user').setDescription('A felhasználó').setRequired(false)
    ),

  async execute(interaction) {
    const user = await interaction.options.getUser('user')?.fetch() || await interaction.user.fetch();
    const banner = user.bannerURL({ dynamic: true, size: 1024 });
    const embed = new EmbedBuilder()
      .setTitle(`🎨 ${user.username} bannere`)
      .setImage(banner || null)
      .setDescription(banner ? '' : '❌ Ennek a felhasználónak nincs bannere!')
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};