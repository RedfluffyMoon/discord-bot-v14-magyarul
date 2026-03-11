const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const https = require('https');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('😂 Véletlenszerű mém'),

  async execute(interaction) {
    await interaction.deferReply();
    https.get('https://meme-api.com/gimme', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        const meme = JSON.parse(data);
        const embed = new EmbedBuilder()
          .setTitle(meme.title)
          .setImage(meme.url)
          .setFooter({ text: `👍 ${meme.ups} | r/${meme.subreddit}` })
          .setColor('#FF4500')
          .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
      });
    });
  }
};