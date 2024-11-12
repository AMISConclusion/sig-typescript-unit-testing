import { HttpRequest } from "@azure/functions";
import { returnDate } from "../../src/functions/helloWorld.js";
import * as helper from "../../src/functions/helper.js";
import { InvocationContextHelper } from "../testHelpers/testHelper.js";
import { afterEach, describe, expect, test, vi } from "vitest";

describe("Simple Vitest test", () => {

    /**
     * Remove logs after each test to prevent them from appearing in subsequent tests.
     */
    afterEach(() => {
        vi.clearAllMocks();
    });

    test("A formatted string is returned", async () => {
        const mockContext = new InvocationContextHelper({})
        const functionRequest = new HttpRequest({
            method: 'GET',
            url: 'https://www.mock.nl',
            params: { year: '2023', week: '12' }
            })          
        
            const response = await returnDate(functionRequest, mockContext.invocationContext)
        
            expect(response.status).toBe(200)
            expect(response.body).toEqual('Hello World! The week is 12 and the year is 20232023.')
    });

    test("A different formatted string is returned", async () => {
        const mockContext = new InvocationContextHelper({})
        vi.spyOn(helper, "returnDoubleString").mockImplementation(() => {
            return 'mockedString';
        });

        const functionRequest = new HttpRequest({
            method: 'GET',
            url: 'https://www.mock.nl',
            params: { year: '2023', week: '12' }
            })          
        
            const response = await returnDate(functionRequest, mockContext.invocationContext)
        
            expect(response.status).toBe(200)
            expect(response.body).toEqual('Hello World! The week is 12 and the year is mockedString.')
    });

});
