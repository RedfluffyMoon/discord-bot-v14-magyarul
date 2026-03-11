const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timer')
    .setDescription('⏱️ Visszaszámláló indítása!')
    .addIntegerOption(option =>
      option.setName('seconds').setDescription('Hány másodperc?').setRequired(true).setMinValue(1).setMaxValue(300)
    ),

  async execute(interaction) {
    const seconds = interaction.options.getInteger('seconds');

    const embed = new EmbedBuilder()
      .setTitle('⏱️ Visszaszámláló')
      .setDescription(`**${seconds}** másodperc múlva lejár!`)
      .setColor('#FF4500')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });

    setTimeout(async () => {
      const doneEmbed = new EmbedBuilder()
        .setTitle('✅ Időzítő lejárt!')
        .setDescription(`${interaction.user}, a **${seconds}** másodperces időzítőd lejárt!`)
        .setColor('#00FF00')
        .setTimestamp();
      await interaction.followUp({ content: `${interaction.user}`, embeds: [doneEmbed] });
    }, seconds * 1000);
  }
};