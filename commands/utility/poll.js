const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('📊 Szavazás létrehozása!')
    .addStringOption(option =>
      option.setName('question').setDescription('A szavazás kérdése').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('option1').setDescription('1. lehetőség').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('option2').setDescription('2. lehetőség').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('option3').setDescription('3. lehetőség').setRequired(false)
    )
    .addStringOption(option =>
      option.setName('option4').setDescription('4. lehetőség').setRequired(false)
    ),

  async execute(interaction) {
    const question = interaction.options.getString('question');
    const options = [
      interaction.options.getString('option1'),
      interaction.options.getString('option2'),
      interaction.options.getString('option3'),
      interaction.options.getString('option4'),
    ].filter(Boolean);

    const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣'];
    const description = options.map((opt, i) => `${emojis[i]} ${opt}`).join('\n\n');

    const embed = new EmbedBuilder()
      .setTitle(`📊 ${question}`)
      .setDescription(description)
      .setColor('#5865F2')
      .setFooter({ text: `Szavazást indította: ${interaction.user.tag}` })
      .setTimestamp();

    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
    for (let i = 0; i < options.length; i++) {
      await msg.react(emojis[i]);
    }
  }
};