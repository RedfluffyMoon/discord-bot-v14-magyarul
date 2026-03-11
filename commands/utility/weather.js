'use strict';

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const https = require('https');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('🌤️ Időjárás lekérése!')
    .addStringOption(option =>
      option.setName('city').setDescription('Város neve').setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const city = encodeURIComponent(interaction.options.getString('city'));
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      return interaction.editReply({ content: '❌ A WEATHER_API_KEY nincs beállítva a .env fájlban!' });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=hu`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          if (json.cod !== 200) {
            return interaction.editReply({ content: `❌ Hiba: ${json.message}` });
          }

          const weather = json.weather[0];
          const main = json.main;
          const wind = json.wind;
          const embed = new EmbedBuilder()
            .setTitle(`🌤️ Időjárás – ${json.name}, ${json.sys.country}`)
            .setDescription(`**${weather.description}**`)
            .addFields(
              { name: '🌡️ Hőmérséklet', value: `${main.temp}°C (érzet: ${main.feels_like}°C)`, inline: true },
              { name: '💧 Páratartalom', value: `${main.humidity}%`, inline: true },
              { name: '💨 Szél', value: `${wind.speed} m/s`, inline: true },
              { name: '📉 Min', value: `${main.temp_min}°C`, inline: true },
              { name: '📈 Max', value: `${main.temp_max}°C`, inline: true },
              { name: '👁️ Láthatóság', value: `${(json.visibility / 1000).toFixed(1)} km`, inline: true },
            )
            .setThumbnail(`https://openweathermap.org/img/wn/${weather.icon}@2x.png`)
            .setColor('#00BFFF')
            .setTimestamp();
          await interaction.editReply({ embeds: [embed] });
        } catch {
          await interaction.editReply({ content: '❌ Hiba történt az időjárás lekérése során!' });
        }
      });
    });
  }
};
