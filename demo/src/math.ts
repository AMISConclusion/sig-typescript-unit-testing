// Named export
// Path: src/math.ts
// Compare this snippet from vitest.config.ts:
export function add(a: number, b: number): number {
  if (a === 0) {
    return b;
  }
  return a + b;
}

// Named export
// Path: src/math.ts
// Compare this snippet from vitest.config.ts:
export function subtract(a: number, b: number): number {
  if (a === 0) {
    return -b;
  }
  return a - b;
}