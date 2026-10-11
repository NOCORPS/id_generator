export const CHARSETS = {
  numeric: '0123456789',
  alpha: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  alphanumeric: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  hex: '0123456789abcdef',
};

export type CharSetType = keyof typeof CHARSETS | string;

export interface GenerateIdOptions {
  length?: number;
  type?: keyof typeof CHARSETS;
  charset?: string;
  prefix?: string;
  suffix?: string;
}
