import { InvocationContext } from '@azure/functions'

/**
 * Helper class to create an InvocationContext for testing
 */
export class InvocationContextHelper {
  invocationContext: InvocationContext
  logBuffer: string[] = []

  constructor ({ functionName = 'testFunction', invocationId = '1' }) {
    this.invocationContext = new InvocationContext({
      functionName,
      invocationId,
      logHandler: (_level, ...args) => {
        for (const arg of args) {
          this.logBuffer =
              typeof arg === 'string'
                ? [...this.logBuffer, arg]
                : [...this.logBuffer, 'Non-string log']
        }
      }
    })
  }
}
