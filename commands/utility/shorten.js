const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const https = require('https');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shorten')
    .setDescription('🔗 URL rövidítése!')
    .addStringOption(option =>
      option.setName('url').setDescription('A rövidítendő URL').setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const inputUrl = interaction.options.getString('url');

    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      return interaction.editReply({ content: '❌ Érvénytelen URL! Az URL-nek `http://` vagy `https://`-sel kell kezdődnie.' });
    }

    const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(inputUrl)}`;

    https.get(apiUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        if (!data.startsWith('https://tinyurl.com')) {
          return interaction.editReply({ content: '❌ Hiba történt az URL rövidítése során!' });
        }
        const embed = new EmbedBuilder()
          .setTitle('🔗 URL Rövidítve!')
          .addFields(
            { name: '📥 Eredeti URL', value: inputUrl.length > 1024 ? inputUrl.substring(0, 1021) + '...' : inputUrl },
            { name: '📤 Rövidített URL', value: `[${data}](${data})` },
          )
          .setColor('#5865F2')
          .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
      });
    }).on('error', async () => {
      await interaction.editReply({ content: '❌ Hiba történt az URL rövidítése során!' });
    });
  }
};
