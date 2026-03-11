const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const roasts = [
  'Olyan lassú vagy, mint egy Internet Explorer! 🐢',
  'A kódod olyan, mint a spagetti – tele van csomókkal! 🍝',
  'Annyira unalmas vagy, hogy még a bot is elalszik tőled! 😴',
  'A logikád olyan, mint a 404-es hiba – nem található! 🔍',
  'Olyan okos vagy, mint egy végtelen ciklus! 🔄',
  'A személyiséged olyan, mint egy üres array – teljesen üres! 📭',
  'Annyira ritka vagy, mint egy hibátlan kód első próbára! 🦄',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roast')
    .setDescription('🔥 Roastolj meg valakit!')
    .addUserOption(option =>
      option.setName('user').setDescription('Kit roastolsz?').setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const roast = roasts[Math.floor(Math.random() * roasts.length)];
    const embed = new EmbedBuilder()
      .setTitle('🔥 Roast')
      .setDescription(`${user} 👉 ${roast}`)
      .setColor('#FF4500')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};