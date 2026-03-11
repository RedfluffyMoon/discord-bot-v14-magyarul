'use strict';

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const https = require('https');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('translate')
    .setDescription('🌍 Szöveg fordítása!')
    .addStringOption(option =>
      option.setName('text').setDescription('A fordítandó szöveg').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('lang').setDescription('Célnyelv kódja (pl. en, de, fr, hu)').setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const text = encodeURIComponent(interaction.options.getString('text'));
    const lang = interaction.options.getString('lang');
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=auto|${lang}`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          const translated = json.responseData.translatedText;
          const embed = new EmbedBuilder()
            .setTitle('🌍 Fordítás')
            .addFields(
              { name: '📥 Eredeti', value: decodeURIComponent(text) },
              { name: '📤 Fordítás', value: translated },
              { name: '🌐 Célnyelv', value: lang.toUpperCase(), inline: true },
            )
            .setColor('#5865F2')
            .setTimestamp();
          await interaction.editReply({ embeds: [embed] });
        } catch {
          await interaction.editReply({ content: '❌ Hiba történt a fordítás során!' });
        }
      });
    });
  }
};
