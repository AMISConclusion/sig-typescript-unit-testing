import { InvocationContext } from "@azure/functions";

/**
 * This function is used to create a mock context for testing.
 * It helps to mock the context to be able to get log messages in tests
 * @param {jest.Mock} mockLog function to mock the log
 * @param {jest.Mock} mockError function to mock the error
 * @returns {InvocationContext} mock context
 */
export function createMockContext (mockLog: jest.Mock, mockError: jest.Mock): InvocationContext {
    const mockFn: jest.Mock = jest.fn();

    return {
        invocationId: "testInvocationId",
        functionName: "testFunctionName",
        extraInputs: { get: mockFn, set: mockFn },
        extraOutputs: { get: mockFn, set: mockFn },
        log: mockLog,
        trace: mockFn,
        debug: mockFn,
        info: mockFn,
        warn: mockFn,
        error: mockError,
        options: {
            trigger: { type: "EventGridTrigger", name: "trigger" },
            extraInputs: [],
            extraOutputs: []
        }
    };
}
