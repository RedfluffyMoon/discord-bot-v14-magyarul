const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const compliments = [
  'Olyan okos vagy, mint egy jól optimalizált algoritmus! 🧠',
  'A mosolyod olyan világos, mint egy tiszta konzol! 😄',
  'Olyan megbízható vagy, mint egy jó backup! 💾',
  'A kreativitásod végtelen, mint egy rekurzív függvény! ♾️',
  'Olyan erős vagy, mint egy szuperszámítógép! 💪',
  'A szíved olyan nagy, mint egy terabájtos SSD! ❤️',
  'Olyan különleges vagy, mint egy hibátlan kód! ✨',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('compliment')
    .setDescription('💝 Dicsérj meg valakit!')
    .addUserOption(option =>
      option.setName('user').setDescription('Kit dicsérünk?').setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    const embed = new EmbedBuilder()
      .setTitle('💝 Dicséret')
      .setDescription(`${user} 👉 ${compliment}`)
      .setColor('#FF69B4')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
