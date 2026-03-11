const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const quotes = [
  { text: 'A siker az, amikor felkészültség találkozik a lehetőséggel.', author: 'Seneca' },
  { text: 'Nem az számít, hányszor esel el, hanem hányszor állsz fel.', author: 'Nelson Mandela' },
  { text: 'A jövő azoké, akik hisznek álmaik szépségében.', author: 'Eleanor Roosevelt' },
  { text: 'Légy te a változás, amelyet látni szeretnél a világban.', author: 'Mahatma Gandhi' },
  { text: 'Az élet olyan, mint a kerékpározás. Az egyensúly megőrzéséhez mozogni kell.', author: 'Albert Einstein' },
  { text: 'A legnagyobb dicsőség nem az, hogy soha nem esünk el, hanem hogy minden esés után felkelünk.', author: 'Konfuciusz' },
  { text: 'Ha lehet álmodni róla, meg is lehet valósítani.', author: 'Walt Disney' },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('💬 Inspiráló idézet'),

  async execute(interaction) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const embed = new EmbedBuilder()
      .setTitle('💬 Inspiráló idézet')
      .setDescription(`*"${quote.text}"*`)
      .setFooter({ text: `— ${quote.author}` })
      .setColor('#FFD700')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};