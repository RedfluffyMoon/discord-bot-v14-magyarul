const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('⏰ Emlékeztető beállítása!')
    .addIntegerOption(option =>
      option.setName('minutes').setDescription('Hány perc múlva?').setRequired(true).setMinValue(1).setMaxValue(1440)
    )
    .addStringOption(option =>
      option.setName('message').setDescription('Mire emlékeztessen?').setRequired(true)
    ),

  async execute(interaction) {
    const minutes = interaction.options.getInteger('minutes');
    const message = interaction.options.getString('message');

    const embed = new EmbedBuilder()
      .setTitle('⏰ Emlékeztető beállítva!')
      .setDescription(`**${minutes}** perc múlva emlékeztetlek:\n\n*${message}*`)
      .setColor('#00BFFF')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });

    setTimeout(async () => {
      const reminderEmbed = new EmbedBuilder()
        .setTitle('🔔 Emlékeztető!')
        .setDescription(`${interaction.user}, emlékeztetőd van:\n\n*${message}*`)
        .setColor('#FFD700')
        .setTimestamp();
      await interaction.followUp({ content: `${interaction.user}`, embeds: [reminderEmbed] });
    }, minutes * 60 * 1000);
  }
};
