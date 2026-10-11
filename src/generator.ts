import { CHARSETS, GenerateIdOptions } from './types';

/**
 * Get random bytes in a cross-platform way.
 */
function getRandomBytes(size: number): Uint8Array {
  // Browser or WebWorker
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    return crypto.getRandomValues(new Uint8Array(size));
  }
  
  // Node.js
  if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    try {
      const nodeCrypto = require('crypto');
      if (nodeCrypto.randomBytes) {
        return nodeCrypto.randomBytes(size);
      }
    } catch (e) {
      // Ignore
    }
  }

  // Fallback (less secure)
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
}

/**
 * Generate a random ID based on the provided options.
 */
export function generateId(options: GenerateIdOptions | number = 16): string {
  const opts: GenerateIdOptions = typeof options === 'number' ? { length: options } : options;
  
  const length = opts.length ?? 16;
  const prefix = opts.prefix ?? '';
  const suffix = opts.suffix ?? '';
  
  let charset = opts.charset;
  if (!charset) {
    const type = opts.type ?? 'alphanumeric';
    charset = CHARSETS[type] ?? CHARSETS.alphanumeric;
  }

  const bytes = getRandomBytes(length);
  const charsetLength = charset.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += charset[bytes[i] % charsetLength];
  }

  return `${prefix}${result}${suffix}`;
}

/**
 * Preset: User ID generator
 */
export const userId = (length = 12) => generateId({ length, type: 'alphanumeric', prefix: 'user_' });

/**
 * Preset: Content ID generator
 */
export const contentId = (length = 16) => generateId({ length, type: 'alphanumeric', prefix: 'cnt_' });

/**
 * Preset: Numeric ID generator
 */
export const numericId = (length = 8) => generateId({ length, type: 'numeric' });

/**
 * Preset: URL Param ID generator (short and clean)
 */
export const urlId = (length = 8) => generateId({ length, type: 'alphanumeric' });
