import * as fs from 'fs';

export interface Config {
  messageId: string;
  roleMap: Record<string, string>;
}

const filePath = 'dist/config.json';
const defaultConfig: Config = {
  messageId: '',
  roleMap: {},
};

export function loadConfig(): Config {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(data) as Config;

    return {
      messageId: parsed.messageId,
      roleMap: parsed.roleMap,
    };
  } catch (error) {
    console.error('Failed to load config:', error);
    return defaultConfig;
  }
}
