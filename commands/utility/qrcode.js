const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('qrcode')
    .setDescription('📱 QR kód generálása!')
    .addStringOption(option =>
      option.setName('text').setDescription('A szöveg vagy URL').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('size').setDescription('Méret (alapértelmezett: 200)').setRequired(false)
        .addChoices(
          { name: '🔹 Kicsi (100x100)', value: '100' },
          { name: '🔷 Közepes (200x200)', value: '200' },
          { name: '🔵 Nagy (300x300)', value: '300' },
        )
    ),

  async execute(interaction) {
    const text = encodeURIComponent(interaction.options.getString('text'));
    const size = interaction.options.getString('size') || '200';
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${text}`;

    const embed = new EmbedBuilder()
      .setTitle('📱 QR Kód')
      .setDescription(`**Tartalom:** \`${decodeURIComponent(text)}\``)
      .setImage(qrUrl)
      .addFields(
        { name: '📐 Méret', value: `${size}x${size} px`, inline: true },
        { name: '🔗 Közvetlen link', value: `[Megnyitás](${qrUrl})`, inline: true },
      )
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
