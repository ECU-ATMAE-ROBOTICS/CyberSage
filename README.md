# CyberSage

CyberSage is a simple bot to allow users to react to messages and have a role assigned to them.

## Hosting (On a RaspberryPi)

### Prerequisites

Install Docker. More details and instructions found in the [Docker documentation](https://docs.docker.com/engine/)

### 1. Create a Config

The bot can be used by creating a [config](config.json), ensure it's named `config.json`. The bot will use this config when monitoring messages, and apply roles based on the appropriate role map for the message.

### 2. Pull the Docker Image

The image can be found in [this](https://hub.docker.com/repository/docker/jarredtd/cybersage/general) DockerHub repistory.

```shell
docker pull jarredtd/cybersage:latest 
```

### 3. Create the Container

Create the container by setting the token and the path to the config.

The token can be found/reset by accessing the bot on [discord.dev](https://discord.com/developers/applications). Read the [documentation](https://discord.com/developers/docs/quick-start/getting-started) for more information on creating the bot if you have not done so already.

You can set the path to the config but either running the command in the same location as the config, or changing `$(pwd)/config.json` to the absolute path to the config. More information on bind mounts in the [Docker documentation](https://docs.docker.com/engine/storage/bind-mounts/).

```shell
docker run -d \
  --name cybersage \
  --env list TOKEN= \
  --mount $(pwd)/config.json:/usr/src/app/config.json \
  jarredtd/cybersage
```

### Example

> Note: Ensure the config is filled in after creating it.

```shell
docker pull jarredtd/cybersage:latest 

mkdir ~/Documents/cybersage/
cd ~/Documents/cybersage/
touch config.json

docker run -d \
  --name cybersage \
  -e TOKEN= \
  -v $(pwd)/config.json:/usr/src/app/config.json \
  jarredtd/cybersage:latest
```

## Contribute

Utilize the npm [scripts](package.json) to ensure contributions are meeting standards. Additions should pass:

- linting (`npm run lint`)
- Formatting (`npm run format`)
- Testing (`npm run test`)

Ensure commits follow the [conventional](https://www.conventionalcommits.org/en/v1.0.0/#specification) format.

## License

This project is licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE).

For full license details, visit the official [GNU AGPL-3.0 License](https://www.gnu.org/licenses/agpl-3.0.html).
