const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('✂️ Kő-Papír-Olló játék!')
    .addStringOption(option =>
      option.setName('choice').setDescription('Válassz!').setRequired(true)
        .addChoices(
          { name: '🪨 Kő', value: 'ko' },
          { name: '📄 Papír', value: 'papir' },
          { name: '✂️ Olló', value: 'ollo' }
        )
    ),

  async execute(interaction) {
    const choices = ['ko', 'papir', 'ollo'];
    const names = { ko: '🪨 Kő', papir: '📄 Papír', ollo: '✂️ Olló' };
    const user = interaction.options.getString('choice');
    const bot = choices[Math.floor(Math.random() * choices.length)];

    let result;
    if (user === bot) result = '🤝 Döntetlen!';
    else if (
      (user === 'ko' && bot === 'ollo') ||
      (user === 'papir' && bot === 'ko') ||
      (user === 'ollo' && bot === 'papir')
    ) result = '🎉 Nyertél!';
    else result = '😢 Vesztettél!';

    const embed = new EmbedBuilder()
      .setTitle('✂️ Kő-Papír-Olló')
      .addFields(
        { name: '👤 Te', value: names[user], inline: true },
        { name: '🤖 Bot', value: names[bot], inline: true },
        { name: '🏆 Eredmény', value: result }
      )
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
