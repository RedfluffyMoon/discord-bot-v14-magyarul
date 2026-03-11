const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('💬 Bot mond valamit')
    .addStringOption(option =>
      option.setName('message').setDescription('Az üzenet').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const message = interaction.options.getString('message');
    await interaction.reply({ content: '✅ Elküldve!', ephemeral: true });
    await interaction.channel.send(message);
  }
};
