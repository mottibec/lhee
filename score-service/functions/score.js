const { NameScoreAlgorithem, DistanceScoreAlgorithem } = require('../scoringAlgorithms');

module.exports.scoreSuggestions = async event => {

    console.log(event.body);

    // get querystring variables
    const { suggestions, options } = JSON.parse(event.body);

    //check if we got any suggestions to score
    if (!Array.isArray(suggestions) || !suggestions.length) {
        return {
            statusCode: 200,
            body: JSON.stringify([]),
        }
    }

    //get all scoring algorithems
    const scoreAlgorithems = getScoreAlgorithem(options)

    //for each suggestion execute all score algorithems and sum the results to a unified score
    const scoredSuggestions = suggestions.map(suggestion => {
        const allScores = scoreAlgorithems.map(algo => algo.calculateScore(suggestion, options));
        const score = allScores.reduce((scoreA, scoreB) => scoreA + scoreB) / scoreAlgorithems.length;
        return {
            ...suggestion,
            score: score
        };
    })

    // return 200 status code
    return {
        statusCode: 200,
        body: JSON.stringify(scoredSuggestions),
    }

}

const getScoreAlgorithem = (options) => {

    //by default we score the distance of results name from the query
    const defaultScoreAlgorithems = [
        new NameScoreAlgorithem()
    ];

    //if the caller provided his location score by distance too
    if (options && options.latitude && options.longitude) {
        defaultScoreAlgorithems.push(new DistanceScoreAlgorithem());
    }
    return defaultScoreAlgorithems;
}