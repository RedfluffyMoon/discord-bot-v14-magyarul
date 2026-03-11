const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const questions = [
  ['🐱 Macska legyen', '🐶 Kutya legyen'],
  ['🌊 Vízben élj', '🌳 Erdőben élj'],
  ['🦸 Szuperhős legyél', '🧙 Varázsló legyél'],
  ['🍕 Egész életedben pizzát egyél', '🍔 Egész életedben hamburgert egyél'],
  ['💻 Programozó legyél', '🎨 Művész legyél'],
  ['🚀 Űrhajós legyél', '🤿 Mélytengeri búvár legyél'],
  ['📚 Mindent tudj', '💰 Végtelen gazdag legyél'],
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('would-you-rather')
    .setDescription('🤔 Melyiket választanád?'),

  async execute(interaction) {
    const q = questions[Math.floor(Math.random() * questions.length)];
    const embed = new EmbedBuilder()
      .setTitle('🤔 Melyiket választanád?')
      .addFields(
        { name: '1️⃣ Első lehetőség', value: q[0], inline: true },
        { name: '2️⃣ Második lehetőség', value: q[1], inline: true }
      )
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};