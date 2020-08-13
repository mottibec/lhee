const { NameScoreAlgorithem, DistanceScoreAlgorithem } = require("../scoringAlgorithms");

describe('score name algorithm', () => {
    test('score name exact match', async () => {
        const algo = new NameScoreAlgorithem();
        const suggestion = {
            "name": "name"
        };
        const options = {
            "q": "name",
        };
        const score = algo.calculateScore(suggestion, options);
        expect(score).toBe(1.0);
    });

    test('score name half length', async () => {
        const algo = new NameScoreAlgorithem();
        const suggestion = {
            "name": "name"
        };
        const options = {
            "q": "na",
        };
        const score = algo.calculateScore(suggestion, options);
        expect(score).toBe(0.5);
    });

    test('score name no match', async () => {
        const algo = new NameScoreAlgorithem();
        const suggestion = {
            "name": "name"
        };
        const options = {
            "q": "",
        };
        const score = algo.calculateScore(suggestion, options);
        expect(score).toBe(0);
    });

    test('score teeest', async () => {
        const algo = new NameScoreAlgorithem();
        const suggestion = {
            "name": "West Memphis, AR, US"
        };
        const options = {
            "q": "West",
        };
        const score = algo.calculateScore(suggestion, options);
        expect(score).toBeGreaterThan(0);
    });
});


describe('score distance algorithm', () => {
    test('score name exact match', async () => {
        const algo = new DistanceScoreAlgorithem();

        const suggestion = {
            "latitude": "46.01677",
            "longitude": "-73.44915",
        };
        const options = {
            "latitude": "46.01677",
            "longitude": "-73.44915",
        };
        const score = algo.calculateScore(suggestion, options);
        expect(score).toBe(1);
    });
});