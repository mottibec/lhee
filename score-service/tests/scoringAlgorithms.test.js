const { NameScoreAlgorithem, PopularityScoreAlgorithem, DistanceScoreAlgorithem } = require("../scoringAlgorithms");

describe('score name algorithm', () => {
    test('score name exact match', async () => {
        const algo = new NameScoreAlgorithem();
        const score = algo.calculateScore('test', { name: 'test' });
        expect(score).toBe(1.0);
    });
});