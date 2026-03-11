const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('🖼️ Profilkép megjelenítése')
    .addUserOption(option =>
      option.setName('user').setDescription('A felhasználó').setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const embed = new EmbedBuilder()
      .setTitle(`🖼️ ${user.username} profilképe`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};