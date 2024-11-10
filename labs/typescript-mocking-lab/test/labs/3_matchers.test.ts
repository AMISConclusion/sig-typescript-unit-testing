import { test, expect} from 'vitest'

test('matching strings', () => {
  const value = 'hello world 1'
  // verify that the value contains a digit
  // verify that the value contains the string 'world'
})

test('matching numbers', () => {
  const value = 2.34
  // verify that the value is close to 2.35 with a precision of 1
  // verify that the value is greater than 2
})

test('matching objects', () => {
  const obj = { a: 2.34, b: 'hello', c: {d: 'world'}}
  const obj_equal = { a: 2.34, b: 'hello', c: {d: 'world'}}
  // verify that the object is equal to obj_equal
  const obj2 = { a: 2.34, b: 'hello'}
  // verify that obj2 is contained in obj
  // verify that obj has the property 'c.d'
  // verify that obj has a property 'a' that is close to 2.3, and a property 'b' that contains 'ell'. Use a single statement.
})

test('matching arrays', () => {
  const arr = [1, 2, 3, 4, 5]
  // verify that the array contains the number 3
  // verify that the array has a length of 5
  // verify that the array contains the numbers 1, 2, and any number
  // verify that the array does not contain the number 6
})