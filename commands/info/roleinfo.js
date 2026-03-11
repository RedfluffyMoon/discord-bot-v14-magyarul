const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roleinfo')
    .setDescription('🎭 Szerepkör információk')
    .addRoleOption(option =>
      option.setName('role').setDescription('Melyik szerepkör?').setRequired(true)
    ),

  async execute(interaction) {
    const role = interaction.options.getRole('role');

    const embed = new EmbedBuilder()
      .setTitle('🎭 Szerepkör Információk')
      .addFields(
        { name: '🏷️ Név', value: role.name, inline: true },
        { name: '🆔 ID', value: role.id, inline: true },
        { name: '🎨 Szín', value: role.hexColor, inline: true },
        { name: '👥 Tagok', value: `${role.members.size}`, inline: true },
        { name: '📌 Pozíció', value: `${role.position}`, inline: true },
        { name: '🔧 Kezelhető', value: role.managed ? 'Igen' : 'Nem', inline: true },
        { name: '📢 Külön megjelenítés', value: role.hoist ? 'Igen' : 'Nem', inline: true },
        { name: '💬 Megemlíthető', value: role.mentionable ? 'Igen' : 'Nem', inline: true },
        { name: '📅 Létrehozva', value: `<t:${Math.floor(role.createdTimestamp / 1000)}:F>`, inline: false },
      )
      .setColor(role.color || 0x5865F2)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
