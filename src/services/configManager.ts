import * as fs from 'fs/promises';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const config_path = 'dist/config.json';

interface ConfigStructure {
  messageMappings: Record<string, Record<string, string>>;
}

const defaultConfig: ConfigStructure = { messageMappings: {} };

export async function saveConfig(config: Map<string, Map<string, string>>) {
  await mutex.runExclusive(async () => {
    const objectToSave = {
      messageMappings: Object.fromEntries(
        Array.from(config.entries(), ([key, value]) => [
          key,
          Object.fromEntries(value),
        ]),
      ),
    };

    await fs.writeFile(config_path, JSON.stringify(objectToSave, null, 2));
  });
}

export async function loadConfig(): Promise<Map<string, Map<string, string>>> {
  return mutex.runExclusive(async () => {
    try {
      await fs.access(config_path);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(config_path, JSON.stringify(defaultConfig, null, 2));
      } else {
        throw error;
      }
    }
    const content = await fs.readFile(config_path, 'utf-8');
    const parsedObject: ConfigStructure = JSON.parse(content);

    const config = new Map(
      Object.entries(parsedObject.messageMappings).map(([key, value]) => [
        key,
        new Map(Object.entries(value)),
      ]),
    );

    return config;
  });
}
