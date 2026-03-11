const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const afkList = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('😴 AFK státusz beállítása')
    .addStringOption(option =>
      option.setName('reason').setDescription('AFK ok').setRequired(false)
    ),

  async execute(interaction) {
    const reason = interaction.options.getString('reason') || 'Nincs megadva';
    afkList.set(interaction.user.id, reason);
    const embed = new EmbedBuilder()
      .setTitle('😴 AFK')
      .setDescription(`${interaction.user} mostantól AFK!\n**Ok:** ${reason}`)
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};