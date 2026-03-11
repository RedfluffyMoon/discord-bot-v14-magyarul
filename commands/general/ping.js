const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('🏓 Megmutatja a bot késleltetését'),

  async execute(interaction) {
    const sent = await interaction.reply({ content: '🏓 Pinging...', fetchReply: true });
    await interaction.editReply(
      `🏓 **Pong!**\n📡 Latency: \\`${sent.createdTimestamp - interaction.createdTimestamp}ms\`\n💓 API: \\`${interaction.client.ws.ping}ms\``
    );
  }
};