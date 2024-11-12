import { test, expect} from 'vitest'

test('matching strings', () => {
  const value = 'hello world 1'
  expect(value).toMatch(/\d/)
  expect(value).toContain('world')
})

test('matching numbers', () => {
  const value = 2.34
  expect(value).toBeCloseTo(2.35, 1)
  expect(value).toBeGreaterThan(2)
})

test('matching objects', () => {
  const obj = { a: 2.34, b: 'hello', c: {d: 'world'}}
  const obj_equal = { a: 2.34, b: 'hello', c: {d: 'world'}}
  expect(obj).toEqual(obj_equal)
  const obj2 = { a: 2.34, b: 'hello'}
  expect(obj).toMatchObject(obj2)
  expect(obj).toHaveProperty('c.d')
  expect(obj).toMatchObject({ a: expect.closeTo(2.3, 1), b: expect.stringContaining('ell')})
})

test('matching arrays', () => {
  const arr = [1, 2, 3, 4, 5]
  expect(arr).toContain(3)
  expect(arr).toHaveLength(5)
  expect(arr).toEqual(expect.arrayContaining([1, 2, expect.any(Number)]))
  expect(arr).not.toContain(6)
})