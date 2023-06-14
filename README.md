# Nike Product Information Discord Bot

This Discord bot retrieves information about a Nike product using its SKU (Stock Keeping Unit). It utilizes the Nike API to fetch data about the product, such as its title, status, price, release date, stock levels, and relevant links. The retrieved information is then displayed in an embed message format in the Discord channel.

## Prerequisites

To run this bot, you need the following dependencies:

- `@discordjs/builders` - A Discord.js library for building slash commands.
- `axios` - A Promise-based HTTP client for making API requests.
- `discord.js` - A powerful JavaScript library for interacting with the Discord API.

You can install these dependencies by running the following command:

```bash
npm install @discordjs/builders axios discord.js
```

## Usage

1. Clone the repository or create a new project.
2. Install the required dependencies as mentioned in the prerequisites.
3. Replace the existing code in the target file with the provided code.
4. Ensure you have a valid Discord bot token. If not, create a new bot application on the Discord Developer Portal.
5. Replace the `YOUR_DISCORD_TOKEN` placeholder in the code with your actual Discord bot token.
6. Start your bot application using a Node.js runtime.

Once the bot is up and running, you can use the `/nike` command followed by the SKU of the Nike product to retrieve information about it.

Example usage:
```
/nike --sku ABC123
```

The bot will respond with an embedded message containing details about the Nike product, including its title, status, price, release date, stock levels, and relevant links. In case the SKU is not found, an error message will be displayed.

## Contributing

Contributions to this project are welcome! If you find any issues or would like to suggest improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
