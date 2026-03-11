const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('🔗 Bot meghívó link'),

  async execute(interaction) {
    const link = `https://discord.com/api/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=8&scope=bot%20applications.commands`;
    const embed = new EmbedBuilder()
      .setTitle('🔗 Bot meghívása')
      .setDescription(`[Kattints ide a bot meghívásához!](${link})`)
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};