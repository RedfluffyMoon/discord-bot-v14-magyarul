const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('membercount')
    .setDescription('👥 Szerver tagok száma'),

  async execute(interaction) {
    const guild = interaction.guild;
    await guild.members.fetch();

    const total = guild.memberCount;
    const humans = guild.members.cache.filter(m => !m.user.bot).size;
    const bots = guild.members.cache.filter(m => m.user.bot).size;
    const online = guild.members.cache.filter(m => m.presence?.status === 'online').size;
    const idle = guild.members.cache.filter(m => m.presence?.status === 'idle').size;
    const dnd = guild.members.cache.filter(m => m.presence?.status === 'dnd').size;

    const embed = new EmbedBuilder()
      .setTitle('👥 Tagok Száma')
      .setThumbnail(guild.iconURL())
      .addFields(
        { name: '👥 Összes tag', value: `${total}`, inline: true },
        { name: '🧑 Emberek', value: `${humans}`, inline: true },
        { name: '🤖 Botok', value: `${bots}`, inline: true },
        { name: '🟢 Online', value: `${online}`, inline: true },
        { name: '🟡 Inaktív', value: `${idle}`, inline: true },
        { name: '🔴 Ne zavarj', value: `${dnd}`, inline: true },
      )
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
