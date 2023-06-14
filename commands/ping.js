const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nike')
    .setDescription('Get information about a Nike product.')
    .addStringOption(option => option.setName('sku').setDescription('The SKU of the Nike product.').setRequired(true)),
  async execute(interaction) {
    const sku = interaction.options.getString('sku');
    const url = `https://api.nike.com/product_feed/threads/v2?filter=marketplace%28US%29&filter=language%28en%29&filter=channelId%28d9a5bc42-4b9c-4976-858a-f159cf99c647%29&filter=productInfo.merchProduct.styleColor%28${sku}%29`;

    try {
      const response = await axios.get(url);
      const product = response.data.objects[0].productInfo[0];

      const title = product.productContent.title;
      const status = product.merchProduct.status;
      const price = product.merchPrice.currentPrice;
      const releaseDate = `<t:${Math.floor(Date.parse(product.merchProduct.commercePublishDate)/1000)}:D>`;
      const isExclusiveAccess = product.merchProduct.isExclusiveAccess;
      const thumbnail = product.imageUrls.productImageUrl;
      const skuCode = product.merchProduct.styleColor;
      const lastUpdated = `<t:${Math.floor(Date.parse(product.merchProduct.modificationDate)/1000)}:F>`;
      const site = product.merchProduct.channelId === 'd9a5bc42-4b9c-4976-858a-f159cf99c647' ? 'SNKRS' : 'Nike';
      const snkrsLink = `https://invite.weziye.cn/snkrs/${skuCode}`;
      const nikeLink = `https://invite.weziye.cn/nike/${skuCode}`;
      const stockxLink = `https://stockx.com/search?s=${skuCode}`;
      const goatLink = `https://www.goat.com/search?query=${skuCode}`;
      const links = `[SNKRS](${snkrsLink}) | [Nike](${nikeLink}) | [StockX](${stockxLink})`;

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(title)
        .setURL(`https://www.nike.com/us/launch/t/${sku}`)
        .setThumbnail(thumbnail)
        .setDescription(`SKU: ${skuCode}`)
        .addFields(
          { name: 'Status', value: status, inline: true },
          { name: 'Price', value: `$${price.toFixed(2)}`, inline: true },
          { name: 'Release Date', value: releaseDate, inline: true },
          { name: 'Exclusive Access', value: isExclusiveAccess ? 'Yes' : 'No', inline: true },
          { name: 'Last Updated', value: lastUpdated, inline: true }
        )
        .addField('Stock Levels', product.skus.map((sku, i) => `${sku.nikeSize} - ${product.availableSkus[i].level}`).join('\n'))
        .addField('Links', links);

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply(`${sku} is not loaded on Nike.`);
    }
  },
};
