const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const questions = [
  {
    question: 'Melyik évben alapították a Discord-ot?',
    options: ['2013', '2015', '2016', '2018'],
    answer: 1,
  },
  {
    question: 'Mi a JavaScript rövidítése?',
    options: ['JS', 'JV', 'JSC', 'J'],
    answer: 0,
  },
  {
    question: 'Hány bájt van egy kilobájtban?',
    options: ['512', '1000', '1024', '2048'],
    answer: 2,
  },
  {
    question: 'Melyik cég fejlesztette a Windows operációs rendszert?',
    options: ['Apple', 'Google', 'Microsoft', 'IBM'],
    answer: 2,
  },
  {
    question: 'Mi a HTML rövidítése?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Logic', 'Home Tool Markup Language'],
    answer: 0,
  },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('❓ Trivia kérdés!'),

  async execute(interaction) {
    const q = questions[Math.floor(Math.random() * questions.length)];
    const labels = ['🇦', '🇧', '🇨', '🇩'];

    const row = new ActionRowBuilder().addComponents(
      q.options.map((opt, i) =>
        new ButtonBuilder()
          .setCustomId(`trivia_${i}`)
          .setLabel(`${labels[i]} ${opt}`)
          .setStyle(ButtonStyle.Primary)
      )
    );

    const embed = new EmbedBuilder()
      .setTitle('❓ Trivia')
      .setDescription(q.question)
      .setColor('#5865F2')
      .setFooter({ text: 'Válassz az alábbi gombok közül!' })
      .setTimestamp();

    const msg = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

    const collector = msg.createMessageComponentCollector({ time: 15000 });

    collector.on('collect', async i => {
      const chosen = parseInt(i.customId.split('_')[1]);
      const correct = chosen === q.answer;
      const resultEmbed = new EmbedBuilder()
        .setTitle(correct ? '✅ Helyes válasz!' : '❌ Helytelen válasz!')
        .setDescription(`A helyes válasz: **${q.options[q.answer]}**`)
        .setColor(correct ? '#00FF00' : '#FF0000')
        .setTimestamp();
      await i.update({ embeds: [resultEmbed], components: [] });
      collector.stop();
    });

    collector.on('end', async (_, reason) => {
      if (reason === 'time') {
        const timeoutEmbed = new EmbedBuilder()
          .setTitle('⏰ Lejárt az idő!')
          .setDescription(`A helyes válasz: **${q.options[q.answer]}**`)
          .setColor('#FFA500')
          .setTimestamp();
        await interaction.editReply({ embeds: [timeoutEmbed], components: [] });
      }
    });
  }
};
