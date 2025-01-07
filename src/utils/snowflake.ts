const snowflakeIdRegex = /^\d{1,19}$/;

export function validateSnowflakeId(id: string) {
  return snowflakeIdRegex.test(id);
}
