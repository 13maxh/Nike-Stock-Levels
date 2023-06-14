const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('atc')
        .setDescription('Generate ATC links for each size variant')
        .addStringOption(option => option.setName('url').setDescription('The URL of the Shopify product').setRequired(true)),
    async execute(interaction) {
        const url = interaction.options.getString('url');
        const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
        const domainMatch = url.match(domainRegex);
        const domain = domainMatch ? domainMatch[1] : null;

        const embed = new MessageEmbed();

        try {
            const response = await axios.get(`${url}.json`);
            const product = response.data.product;

            if (product.variants) {
                const atcLinks = product.variants.map(variant => `[ATC ${variant.title}](https://${domain}/cart/${variant.id}:1)`);

                const productName = product.title.replace(/\(|\)/g, '');

                embed.setTitle(productName);
                embed.setDescription(atcLinks.join('\n'));
                embed.setColor('#9bd4ff');
                embed.setAuthor({ name: 'Evolve IO', iconURL: 'https://media.discordapp.net/attachments/958186679003398184/1071632047761793166/Main_Logo.png?width=921&height=921' });
                embed.setFooter({ text: 'Evolve IO', iconURL: 'https://media.discordapp.net/attachments/958186679003398184/1071632047761793166/Main_Logo.png?width=921&height=921' });

                await interaction.reply({ embeds: [embed] });
            } else {
                embed.setTitle('Error');
                embed.setDescription('No variants found');
                embed.setColor('#9bd4ff');
                embed.setAuthor({ name: 'Evolve IO', iconURL: 'https://media.discordapp.net/attachments/958186679003398184/1071632047761793166/Main_Logo.png?width=921&height=921' });
                embed.setFooter({ text: 'Evolve IO', iconURL: 'https://media.discordapp.net/attachments/958186679003398184/1071632047761793166/Main_Logo.png?width=921&height=921' });

                await interaction.reply({ embeds: [embed] });
            }
        } catch (error) {
            embed.setTitle('Error');
            embed.setDescription('There was an error with the Shopify API. Please try again later.');
            embed.setColor('#9bd4ff');
            embed.setAuthor({ name: 'Evolve IO', iconURL: 'https://media.discordapp.net/attachments/958186679003398184/1071632047761793166/Main_Logo.png?width=921&height=921' });
            embed.setFooter({ text: 'Evolve IO', iconURL: 'https://media.discordapp.net/attachments/958186679003398184/1071632047761793166/Main_Logo.png?width=921&height=921' });

            await interaction.reply({ embeds: [embed] });
        }
    },
};
