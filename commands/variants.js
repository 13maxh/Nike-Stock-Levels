const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('variants')
        .setDescription('Get variants of a Shopify product')
        .addStringOption(option => option.setName('url').setDescription('The URL of the Shopify product').setRequired(true)),
    async execute(interaction) {
        const url = interaction.options.getString('url');
        const embed = new MessageEmbed();

        try {
            const response = await axios.get(`${url}.json`);
            const product = response.data.product;

            if (product.variants) {
                const taj = [];
                const sizes = [];
                const stock = [];
                let totalStock = 0;

                product.variants.forEach(variant => {
                    taj.push(variant.id);
                    sizes.push(variant.title);

                    if (url.includes('shoepalace')) {
                        const itemStock = variant.old_inventory_quantity;
                        const stockFormatted = itemStock.toString().replace('-', '');
                        stock.push(stockFormatted);
                        totalStock += parseInt(stockFormatted);
                    }
                });

                embed.setTitle(product.title);
                embed.setURL(url);
                embed.setThumbnail(product.images[0].src);
                embed.addField('Sizes', sizes.join('\n'), true);
                embed.addField('Variants', taj.join('\n'), true);

                if (url.includes('shoepalace')) {
                    embed.addField('Stock', stock.join('\n'), true);
                    embed.addField('Total Stock', `\`${totalStock}\``, true);
                }

                embed.setColor('#9bd4ff');
                embed.setAuthor('Evolve IO', 'https://media.discordapp.net/attachments/958186679003398184/1071632047761793166/Main_Logo.png?width=921&height=921');
                embed.setFooter('Evolve IO', 'https://media.discordapp.net/attachments/958186679003398184/1071632047761793166/Main_Logo.png?width=921&height=921');
                interaction.reply({ embeds: [embed] });
            } else {
                embed.setTitle('Error');
                embed.setDescription('No variants found');
                embed.setColor('#9bd4ff');
                embed.setAuthor('Evolve IO', 'https://media.discordapp.net/attachments/958186679003398184/1071632047761793166/Main_Logo.png?width=921&height=921');
                embed.setFooter('Evolve IO', 'https://media.discordapp.net/attachments/958186679003398184/1071632047761793166/Main_Logo.png?width=921&height=921');
                interaction.reply({ embeds: [embed] });
            }
        } catch (error) {
            embed.setTitle('Error');
            embed.setDescription('There was an error with the Shopify API. Please try again later.');
            embed.setColor('#9bd4ff');
            embed.setAuthor('Evolve IO', 'https://media.discordapp.net/attachments/958186679003398184/1071632047761793166/Main_Logo.png?width=921&height=921');
            embed.setFooter('Evolve IO', 'https://media.discordapp.net/attachments/958186679003398184/1071632047761793166/Main_Logo.png?width=921&height=921');
            interaction.reply({ embeds: [embed] });
        }
    },
};