const jestPlugin = require('serverless-jest-plugin');
const file = require('../functions/score');

const func = jestPlugin.lambdaWrapper.wrap(file, { handler: 'scoreSuggestions' });

describe('GET /score', () => {

  beforeAll(async () => { });

  test('score city with exact name and exact location', async () => {
    const json = JSON.stringify({
      suggestions: [
        {
          name: "Watervliet, NY, US",
          latitude: "42.73008",
          longitude: "-73.70123"
        }
      ],
      options: {
        q: "Watervliet, NY, US",
        latitude: "42.73008",
        longitude: "-73.70123"
      }
    });
    const response = await func.run({ body: json });
    const body = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(body[0].score).toEqual(1);
  });

});

