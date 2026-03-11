const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('🏓 Megmutatja a bot késleltetését'),

  async execute(interaction) {
    const sent = await interaction.reply({ content: '🏓 Pinging...', fetchReply: true });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiPing = interaction.client.ws.ping;

    const embed = new EmbedBuilder()
      .setTitle('🏓 Pong!')
      .addFields(
        { name: '📡 Latency', value: `\`${latency}ms\``, inline: true },
        { name: '💓 API Ping', value: `\`${apiPing}ms\``, inline: true },
      )
      .setColor(latency < 100 ? '#00FF00' : latency < 200 ? '#FFA500' : '#FF0000')
      .setTimestamp();

    await interaction.editReply({ content: null, embeds: [embed] });
  }
};