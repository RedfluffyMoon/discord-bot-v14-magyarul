const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('base64')
    .setDescription('🔒 Base64 kódolás / dekódolás!')
    .addStringOption(option =>
      option.setName('action').setDescription('Kódolás vagy dekódolás?').setRequired(true)
        .addChoices(
          { name: '🔒 Kódolás', value: 'encode' },
          { name: '🔓 Dekódolás', value: 'decode' }
        )
    )
    .addStringOption(option =>
      option.setName('text').setDescription('A szöveg').setRequired(true)
    ),

  async execute(interaction) {
    const action = interaction.options.getString('action');
    const text = interaction.options.getString('text');
    let result;

    try {
      if (action === 'encode') {
        result = Buffer.from(text).toString('base64');
      } else {
        result = Buffer.from(text, 'base64').toString('utf-8');
      }
    } catch {
      return interaction.reply({ content: '❌ Érvénytelen bemenet!', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle(action === 'encode' ? '🔒 Base64 Kódolás' : '🔓 Base64 Dekódolás')
      .addFields(
        { name: '📥 Bemenet', value: `\`${text}\`` },
        { name: '📤 Eredmény', value: `\`${result}\`` }
      )
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};