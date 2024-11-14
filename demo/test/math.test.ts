import { describe, it, expect } from 'vitest';
import { add, subtract } from '../src/math';

describe('math functions', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should subtract two numbers', () => {
    expect(subtract(2, 1)).toBe(1);
  });
});