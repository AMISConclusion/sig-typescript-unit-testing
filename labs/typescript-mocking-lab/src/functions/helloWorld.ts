import { PersonInfo } from '../types/helloWorld.js'
import { AgeCalculator, getAgeFromDate } from '../common/age.js'
import { getPersonInfo } from '../common/personInfo.js'
import { Logger } from '../types/logger.js'

export function helloWorld(person: PersonInfo): string {
  const name = person.name
  const age = (person.birthdate != null) ? getAgeFromDate(person.birthdate) : 'unknown'
  return `Hello, ${name}! You are ${age} years old.`
}

export function helloWorldWithClassDependency(person: PersonInfo): string {
  const ageCalculator = new AgeCalculator()
  const name = person.name
  const age = (person.birthdate != null) ? ageCalculator.getAgeFromDate(person.birthdate) : 'unknown'
  return `Hello, ${name}! You are ${age} years old.`
}

export async function helloWorldWithAsyncDependency(): Promise<string> {
  const person = await getPersonInfo()
  const name = person.name
  const age = (person.birthdate != null) ? getAgeFromDate(person.birthdate) : 'unknown'
  return `Hello, ${name}! You are ${age} years old.`
}

export async function helloWorldWithLoggerInput(logger: Logger, person: PersonInfo): Promise<string> {
  logger.info('Retrieving person info')
  const name = person.name
  const age = (person.birthdate != null) ? getAgeFromDate(person.birthdate) : 'unknown'
  logger.info(`Person info retrieved: ${name}, ${age}`)
  return `Hello, ${name}! You are ${age} years old.`
}