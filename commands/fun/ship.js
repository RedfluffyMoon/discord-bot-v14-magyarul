const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('💘 Két felhasználó kompatibilitása!')
    .addUserOption(option => option.setName('user1').setDescription('Első felhasználó').setRequired(true))
    .addUserOption(option => option.setName('user2').setDescription('Második felhasználó').setRequired(true)),

  async execute(interaction) {
    const user1 = interaction.options.getUser('user1');
    const user2 = interaction.options.getUser('user2');
    const percent = Math.floor(Math.random() * 101);
    const bar = '█'.repeat(Math.floor(percent / 10)) + '░'.repeat(10 - Math.floor(percent / 10));
    const embed = new EmbedBuilder()
      .setTitle('💘 Ship-o-méter')
      .setDescription(`${user1} ❤️ ${user2}\n\n\`[${bar}]\` **${percent}%**`)
      .setColor('#FF69B4')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};