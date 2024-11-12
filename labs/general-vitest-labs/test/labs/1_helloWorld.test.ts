import { describe, test, expect, vi } from 'vitest'
import { PersonInfo } from '../../src/types/helloWorld.js'
import { helloWorld, helloWorldWithAsyncDependency, helloWorldWithClassDependency, helloWorldWithLoggerInput } from '../../src/functions/helloWorld.js'
import { beforeEach } from 'node:test'
import { Logger } from '../../src/types/logger.js'

const birthdate = new Date(1987, 3, 17)
const person: PersonInfo = {
  name: 'Joost',
  birthdate: birthdate
}

describe('HelloWorld', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
  })

  //1. Basic function mock
  test('should respond with name and birthdate', () => {
    // mock the getAgeFromDate function to return the value 37
    const res = helloWorld(person)
    expect(res).toBe('Hello, Joost! You are 37 years old.')
    // check if the getAgeFromDate function was called with the birthdate
    // Bonus: check that the getAgeFromDate function was called with any Date object
    // check that the getAgeFromDage function was called exactly once
  })
  //2. Mock error from synchronus function
  test('should rethrow error from age module', () => {
    // mock the getAgeFromDate function to throw an error with the message 'invalid input parameter [input]'
    const person = {'name': 'Joost', 'birthdate': '1984-03-17'} as unknown as PersonInfo
    expect(() => helloWorld(person)).toThrowError(`invalid input parameter ${person.birthdate}`)
  })
  //3. Async function mock
  test('should retrieve the person from the personInfo dependency', async () => {
    // mock the getPersonInfo function. Keep in mind that this function returns a promise.
    // there is a nice way to do this, and a less nice way. Check the solution to see if you found the nice way.
    const res = await helloWorldWithAsyncDependency()
    expect(res).toBe('Hello, Joost! You are 37 years old.')
    // verify that the getPersonInfo function was called exactly once
  })
  //4. Mock rejected promise
  test('Should throw an error when getPersonInfo rejects', async () => {
    // Mock the getPersonInfo function to reject with an error
    expect(helloWorldWithAsyncDependency()).rejects.toThrow('Could not retrieve person info')
  })

  // 5. Class mock
  test('Should use the AgeCalculator class', async () => {
    // Mock age.js with a custom implementation that mocks the AgeCalculator class and its getAgeFromDate function. The Vitest documentation has an example of how to do this.
    helloWorldWithClassDependency(person)
    // verify that the AgeCalculator.prototype.getAgeFromDate function was called exactly once
  })

  // 6. Generate fake object
  test('Should call the logging function', async () => {
    // Sometimes we need to pass a complex object to a function. Creating a mocks for objects can be a bit tedious, especially for large nested objects.
    // vitest-mock-extended is a package that can help with this.

    const logger = {} as Logger // Replace this line to create a mock for the logger
    helloWorldWithLoggerInput(logger, person)
    // verify that the logger.info function was called twice
    // verify that the first call to logger.info was with the string 'Retrieving person info'
  })
})
