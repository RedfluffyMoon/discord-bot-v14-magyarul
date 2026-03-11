const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('emojiinfo')
    .setDescription('😀 Emoji információk')
    .addStringOption(option =>
      option.setName('emoji').setDescription('Az emoji (csak szerver emoji)').setRequired(true)
    ),

  async execute(interaction) {
    const input = interaction.options.getString('emoji');
    const match = input.match(/^<a?:(\w+):(\d+)>$/);

    if (!match) {
      return interaction.reply({ content: '❌ Csak szerver emojikat tudok elemezni! Példa: `:emoji_neve:`', ephemeral: true });
    }

    const animated = input.startsWith('<a:');
    const name = match[1];
    const id = match[2];
    const url = `https://cdn.discordapp.com/emojis/${id}.${animated ? 'gif' : 'png'}`;

    const embed = new EmbedBuilder()
      .setTitle('😀 Emoji Információk')
      .setThumbnail(url)
      .addFields(
        { name: '🏷️ Név', value: name, inline: true },
        { name: '🆔 ID', value: id, inline: true },
        { name: '🎞️ Animált', value: animated ? 'Igen' : 'Nem', inline: true },
        { name: '🔗 URL', value: `[Kattints ide](${url})`, inline: false },
      )
      .setColor('#5865F2')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};