# CyberSage
CyberSage is a simple bot to allow users to react to a message and have a role assigned to them. 

## Getting Started
### Update the Config
The bot can be used by setting the message id in the [config](src/config.json), and adding a role map. 
```
{
  "messageId": "0000000000000000000",

  "roleMap": {
    "💻": "0000000000000000000",
    "🔨": "0000000000000000000",
    "💡": "0000000000000000000"
  }
}
```
The bot will then monitor that message, and appropriately assign roles respectively to any users who react.

### Build the Docker Container
1. Add the bot token to the [`create-docker-container.sh`](scripts/create-docker-container.sh) script
2. Run the `create-docker-container.sh`

This will build the image for the bot, and start the container. This container will use the config from the src directory mentioned previously. 

> NOTE: Refer to [Docker docs](https://docs.docker.com/reference/cli/docker/) for further information on building image and running the container. 


## Planned Features / Improvements
- Muliple messages, each with a mapping
- Slash commands to modify the config (message ids and role mappings)
- Improve docker experience
- Improve config path logic

## Contribute

Utilize the npm [scripts](package.json) to ensure contributions are meeting standards. Additions should pass:
- linting (`npm run lint`)
- Formatting (`npm run format`)
- Testing (`npm run test`)

Ensure commits follow the [conventional](https://www.conventionalcommits.org/en/v1.0.0/#specification) format.

## License

This project is licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE).

For full license details, visit the official [GNU AGPL-3.0 License](https://www.gnu.org/licenses/agpl-3.0.html).
