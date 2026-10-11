import { describe, it, expect } from 'vitest';
import { generateId, userId, numericId, urlId } from './generator';

describe('ID Generator', () => {
  it('should generate an ID of default length', () => {
    const id = generateId();
    expect(id).toHaveLength(16);
  });

  it('should generate an ID of specific length', () => {
    const id = generateId(10);
    expect(id).toHaveLength(10);
  });

  it('should generate numeric IDs', () => {
    const id = generateId({ length: 8, type: 'numeric' });
    expect(id).toHaveLength(8);
    expect(id).toMatch(/^[0-9]+$/);
  });

  it('should generate alpha IDs', () => {
    const id = generateId({ length: 8, type: 'alpha' });
    expect(id).toHaveLength(8);
    expect(id).toMatch(/^[a-zA-Z]+$/);
  });

  it('should generate alphanumeric IDs', () => {
    const id = generateId({ length: 20, type: 'alphanumeric' });
    expect(id).toHaveLength(20);
    expect(id).toMatch(/^[a-zA-Z0-9]+$/);
  });

  it('should use custom charset', () => {
    const id = generateId({ length: 10, charset: 'ABC' });
    expect(id).toHaveLength(10);
    expect(id).toMatch(/^[ABC]+$/);
  });

  it('should add prefix and suffix', () => {
    const id = generateId({ length: 5, prefix: 'pre_', suffix: '_post' });
    expect(id).toHaveLength(14); // 4 + 5 + 5
    expect(id.startsWith('pre_')).toBe(true);
    expect(id.endsWith('_post')).toBe(true);
  });

  it('should work with presets', () => {
    expect(userId()).toMatch(/^user_[a-zA-Z0-9]{12}$/);
    expect(numericId()).toMatch(/^[0-9]{8}$/);
    expect(urlId()).toMatch(/^[a-zA-Z0-9]{8}$/);
  });
});
