import { app, HttpRequest, InvocationContext } from "@azure/functions";
import { returnDoubleString } from "./helper";

/**
 * Generates reports via HTTP request and stores them in Azure Blob Storage.
 * @param {HttpRequest} request - The HTTP request object, which should contain query parameters for 'week' and 'year'.
 * @param {InvocationContext} context - The Azure function invocation context.
 * @returns {Promise<object>} - A promise that resolves to an HTTP response object. The response status is 200 if the operation is successful, and 500 if an error occurs. The response body contains a stringified JSON object with the results of storing the reports if the operation is successful, and an error message if an error occurs.
 * @throws {Error} - Throws an error if the 'week' and 'year' query parameters are not provided in the request.
 */
export async function returnDate (request: HttpRequest, context: InvocationContext) {

    // Get the 'week' and 'year' query parameters from the request.
    const week = request.params.week
    const year = request.params.year

    // Validate the 'week' and 'year' params parameters.
    if (week == null || week.trim() === '' || year == null || year.trim() === '') {
        throw new Error('Please pass the \'week\' and \'year\' query parameters in the request.')
    }

    const yearDoubled = returnDoubleString(year)

    // Return a successful response.
    return {
        status: 200,
        body: `Hello World! The week is ${week} and the year is ${yearDoubled}.`
    }
}

app.http("returnDate", {
    methods: ["POST"],
    authLevel: "anonymous",
    handler: returnDate
});
