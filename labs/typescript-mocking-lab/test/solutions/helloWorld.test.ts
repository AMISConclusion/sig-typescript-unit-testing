import { describe, test, expect, vi } from 'vitest'
import { PersonInfo } from '../../src/types/helloWorld.js'
import { helloWorld, helloWorldWithAsyncDependency, helloWorldWithClassDependency, helloWorldWithLoggerInput } from '../../src/functions/helloWorld.js'
import { AgeCalculator, getAgeFromDate } from '../../src/common/age.js'
import { getPersonInfo } from '../../src/common/personInfo.js'
import { beforeEach } from 'node:test'
import { mock } from 'vitest-mock-extended'
import { Logger } from '../../src/types/logger.js'

// This custom mock implementation is needed to mock the AgeCalculator class.
// If we were just mocking a function, we could use vi.mock() directly without the need for a custom implementation.
vi.mock('../../src/common/age.js', () => {
  //A class in javascript is just a constructor function.
  const AgeCalculator = vi.fn()
  // We alter the prototype of the class to add a mock function. Each instance of the class that is created will have this mock.
  AgeCalculator.prototype.getAgeFromDate = vi.fn()
  return { getAgeFromDate: vi.fn(), AgeCalculator }
})
// Mock the personInfo module, using default implementation.
vi.mock('../../src/common/personInfo.js')


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
    // we need to call vi.mocked() to let typescript know that the function is mocked.
    vi.mocked(getAgeFromDate).mockReturnValue(37)
    const res = helloWorld(person)
    expect(res).toBe('Hello, Joost! You are 37 years old.')
    expect(getAgeFromDate).toHaveBeenCalledWith(birthdate)
    expect(getPersonInfo).not.toHaveBeenCalled()
  })

  //2. Mock error from synchronus function
  test('should rethrow error from age module', () => {
    // mock the getAgeFromDate function to throw an error with the message 'invalid input parameter [input]'
    const person = {'name': 'Joost', 'birthdate': '1984-03-17'} as unknown as PersonInfo
    vi.mocked(getAgeFromDate).mockImplementation((age: unknown) => {
      throw new Error(`invalid input parameter ${age}`)
    })
    expect(() => helloWorld(person)).toThrowError(`invalid input parameter ${person.birthdate}`)
  })
  //3. Async function mock
  test('should retrieve the person from the personInfo dependency', async () => {
    vi.mocked(getAgeFromDate).mockReturnValue(37)
    // to mock a resolved promise, use mockResolvedValue.
    vi.mocked(getPersonInfo).mockResolvedValue({
      name: 'Joost',
      birthdate: new Date(1987, 3, 17)
    })
    const res = await helloWorldWithAsyncDependency()
    expect(res).toBe('Hello, Joost! You are 37 years old.')
    expect(getPersonInfo).toHaveBeenCalledTimes(1)
  })
  //4. Mock rejected promise
  test('Should throw an error when getPersonInfo rejects', async () => {
    // use mockRejectedValue to mock rejected promises
    vi.mocked(getPersonInfo).mockRejectedValue(new Error('Could not retrieve person info'))
    expect(helloWorldWithAsyncDependency()).rejects.toThrow('Could not retrieve person info')
  })

  // 5. Class mock
  test('Should use the AgeCalculator class', async () => {
    vi.mocked(AgeCalculator.prototype.getAgeFromDate).mockReturnValue(37)
    const res = await helloWorldWithClassDependency(person)
    expect(res).toBe('Hello, Joost! You are 37 years old.')
    expect(AgeCalculator.prototype.getAgeFromDate).toHaveBeenCalledWith(birthdate)
  })

  // 6. Generate fake object
  test('Should call the logging function', async () => {
    // Use vitest-mock-extended to easily create a mock for the logger
    const logger = mock<Logger>()
    helloWorldWithLoggerInput(logger, person)
    expect(logger.info).toHaveBeenCalledTimes(2)
    const infoCalls = logger.info.mock.calls
    // logger.info.mock.calls is an array of calls, where each call is an an array of arguments. [0][0] corresponds to the first argument of the first call.
    //@ts-expect-error We have verified that the first call exists, so we can safely access it.
    expect(infoCalls[0][0]).toBe('Retrieving person info')
  })
})
