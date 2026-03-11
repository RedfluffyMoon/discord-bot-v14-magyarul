'use strict';

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const responses = [
  '✅ Igen!',
  '✅ Határozottan igen!',
  '✅ Minden jel erre mutat!',
  '✅ Valószínűleg igen.',
  '🤔 Nem biztos...',
  '🤔 Kérdezz később!',
  '🤔 Nem tudok most válaszolni.',
  '🤔 Koncentrálj és kérdezz újra!',
  '❌ Nem hiszem.',
  '❌ Határozottan nem!',
  '❌ Valószínűleg nem.',
  '❌ Kilátások nem jók.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('🎱 Kérdezd a varázsgömböt!')
    .addStringOption(option =>
      option.setName('question').setDescription('A kérdésed').setRequired(true)
    ),

  async execute(interaction) {
    const question = interaction.options.getString('question');
    const response = responses[Math.floor(Math.random() * responses.length)];
    const embed = new EmbedBuilder()
      .setTitle('🎱 8Ball')
      .addFields(
        { name: '❓ Kérdés', value: question },
        { name: '🎱 Válasz', value: response }
      )
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
