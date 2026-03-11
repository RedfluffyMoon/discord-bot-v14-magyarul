const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('channelinfo')
    .setDescription('📢 Csatorna információk')
    .addChannelOption(option =>
      option.setName('channel').setDescription('Melyik csatorna?').setRequired(false)
    ),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel') || interaction.channel;

    const types = {
      [ChannelType.GuildText]: '💬 Szöveges csatorna',
      [ChannelType.GuildVoice]: '🔊 Hang csatorna',
      [ChannelType.GuildCategory]: '📁 Kategória',
      [ChannelType.GuildAnnouncement]: '📢 Bejelentés csatorna',
      [ChannelType.GuildStageVoice]: '🎙️ Színpad csatorna',
      [ChannelType.GuildForum]: '📋 Fórum csatorna',
    };

    const embed = new EmbedBuilder()
      .setTitle('📢 Csatorna Információk')
      .addFields(
        { name: '🏷️ Név', value: channel.name, inline: true },
        { name: '🆔 ID', value: channel.id, inline: true },
        { name: '📌 Típus', value: types[channel.type] || 'Ismeretlen', inline: true },
        { name: '📁 Kategória', value: channel.parent ? channel.parent.name : 'Nincs', inline: true },
        { name: '🔒 NSFW', value: channel.nsfw ? 'Igen' : 'Nem', inline: true },
        { name: '📅 Létrehozva', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:F>`, inline: false },
      )
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};