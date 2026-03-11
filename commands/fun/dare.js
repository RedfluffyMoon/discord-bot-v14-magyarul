const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const dares = [
  'Írj egy verset valakinek a szerveren! 📝',
  'Küldj egy vicces GIF-et a chatbe! 😂',
  'Írd le az összes online barátod nevét! 👥',
  'Mondj egy titkot a chatbe! 🤫',
  'Írj egy romantikus üzenetet az előző üzenet küldőjének! 💌',
  'Változtasd meg a profilképed 10 percre valami viccesre! 🤡',
  'Írj egy dal szöveget a bot nevéről! 🎵',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dare')
    .setDescription('🎯 Merj egyet!'),

  async execute(interaction) {
    const dare = dares[Math.floor(Math.random() * dares.length)];
    const embed = new EmbedBuilder()
      .setTitle('🎯 Merj egyet!')
      .setDescription(dare)
      .setColor('#FF4500')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};