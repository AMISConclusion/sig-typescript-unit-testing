import { HttpRequest, InvocationContext } from "@azure/functions";
import { createMockContext } from "../testHelpers/testHelper";
import { returnDate } from "../../src/functions/helloWorld";
import * as helper from "../../src/functions/helper";
let mockContext: InvocationContext;
let mockLog: jest.Mock;
let mockError: jest.Mock;

describe("Generate Reports", () => {
    /**
     * Defines the mock context, log and error functions to be used in the tests and prepares the necessary data
     */
    beforeEach(async function () {
        mockLog = jest.fn();
        mockError = jest.fn();
        mockContext = createMockContext(mockLog, mockError);
    });

    /**
     * Remove logs after each test to prevent them from appearing in subsequent tests.
     */
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("A formatted string is returned", async () => {
        const functionRequest = new HttpRequest({
            method: 'GET',
            url: 'https://www.mock.nl',
            params: { year: '2023', week: '12' }
            })          
        
            const response = await returnDate(functionRequest, mockContext)
        
            expect(response.status).toBe(200)
            expect(response.body).toEqual('Hello World! The week is 12 and the year is 20232023.')
    });

    test("A formatted string is returned", async () => {
        jest.spyOn(helper, "returnDoubleString").mockImplementation(() => {
            return 'mockedString';
        });

        const functionRequest = new HttpRequest({
            method: 'GET',
            url: 'https://www.mock.nl',
            params: { year: '2023', week: '12' }
            })          
        
            const response = await returnDate(functionRequest, mockContext)
        
            expect(response.status).toBe(200)
            expect(response.body).toEqual('Hello World! The week is 12 and the year is mockedString.')
    });
});

