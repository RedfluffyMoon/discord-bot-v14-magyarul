const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const truths = [
  'Mi az eddigi legkínosabb emléked? 😳',
  'Kit szerettél titokban a csoportban? 🤫',
  'Mi volt az utolsó hazugság, amit mondtál? 🤥',
  'Mi az, amit soha nem vallottál be senkinek? 🤐',
  'Mi a legnagyobb félelmünk? 😱',
  'Mikor sírtál utoljára és miért? 😢',
  'Mi a leghülyébb dolog, amit valaha tettél? 🙈',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('truth')
    .setDescription('🤔 Igazság kérdés!'),

  async execute(interaction) {
    const truth = truths[Math.floor(Math.random() * truths.length)];
    const embed = new EmbedBuilder()
      .setTitle('🤔 Igazság')
      .setDescription(truth)
      .setColor('#00BFFF')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};