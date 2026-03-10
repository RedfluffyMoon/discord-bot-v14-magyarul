// commands/general/afk.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const afkUsers = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('😴 AFK státusz beállítása')
    .addStringOption(option =>
      option.setName('reason').setDescription('AFK oka').setRequired(false)
    ),

  async execute(interaction) {
    const reason = interaction.options.getString('reason') || 'Nincs megadva';
    afkUsers.set(interaction.user.id, { reason, time: Date.now() });

    const embed = new EmbedBuilder()
      .setTitle('😴 AFK státusz beállítva')
      .setDescription(`**${interaction.user.username}** mostantól AFK!\n**Ok:** ${reason}`)
      .setColor('#FFA500')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
