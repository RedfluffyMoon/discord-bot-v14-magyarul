const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('calculator')
    .setDescription('🧮 Számológép!')
    .addNumberOption(option =>
      option.setName('num1').setDescription('Első szám').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('operator').setDescription('Műveleti jel').setRequired(true)
        .addChoices(
          { name: '➕ Összeadás', value: '+' },
          { name: '➖ Kivonás', value: '-' },
          { name: '✖️ Szorzás', value: '*' },
          { name: '➗ Osztás', value: '/' },
          { name: '📐 Maradék', value: '%' },
        )
    )
    .addNumberOption(option =>
      option.setName('num2').setDescription('Második szám').setRequired(true)
    ),

  async execute(interaction) {
    const num1 = interaction.options.getNumber('num1');
    const op = interaction.options.getString('operator');
    const num2 = interaction.options.getNumber('num2');

    let result;
    if (op === '+') result = num1 + num2;
    else if (op === '-') result = num1 - num2;
    else if (op === '*') result = num1 * num2;
    else if (op === '/') {
      if (num2 === 0) return interaction.reply({ content: '❌ Nullával nem lehet osztani!', ephemeral: true });
      result = num1 / num2;
    }
    else if (op === '%') result = num1 % num2;

    const embed = new EmbedBuilder()
      .setTitle('🧮 Számológép')
      .setDescription(`**${num1} ${op} ${num2} = ${result}**`)
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};