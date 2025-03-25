import * as fs from 'fs';

export interface Message {
  messageId: string;
  roleMap: Record<string, string>;
}

export interface Config {
  messages: Message[];
}

const filePath = 'config.json';
const defaultConfig: Config = {
  messages: [
    {
      messageId: '',
      roleMap: {},
    },
  ],
};
export function loadConfig(): Config {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(data) as Config;

    return {
      messages: parsed.messages.map((message: Message) => ({
        messageId: message.messageId,
        roleMap: message.roleMap,
      })),
    };
  } catch (error) {
    console.error('Failed to load config:', error);
    return defaultConfig;
  }
}

export function prettifyConfig(config: Config): string {
  return JSON.stringify(config, null, 2);
}
