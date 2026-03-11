const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const jokes = [
  'Miért nem játszik az informatikus focit? Mert mindig kikerüli a bugokat! 🐛',
  'Mit mond a programozó, ha hibát talál? "Ez feature, nem bug!" 😂',
  'Miért szeret a programozó erdőben sétálni? Mert ott sok a fa (tree)! 🌳',
  'Hogy hívják a félénk programozót? Aki fél a looptól! 😅',
  'Mi a különbség a pizzafutár és a programozó között? A pizzafutár teljesíti a határidőket! 🍕',
  'Miért nem megy a programozó orvoshoz? Mert önmagát debugolja! 💊',
  'Mit mond a JavaScript a Javának? "Te vagy az apám, de én vagyok a jobb!" 😎',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('😂 Véletlenszerű vicc'),

  async execute(interaction) {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    const embed = new EmbedBuilder()
      .setTitle('😂 Vicc')
      .setDescription(joke)
      .setColor('#FFD700')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};