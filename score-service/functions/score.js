import { NameScoreAlgorithem, PopularityScoreAlgorithem, DistanceScoreAlgorithem } from './scoreAlgorithem'

module.exports.scoreSuggestions = async event => {

    console.log(event);

    // get querystring variables
    const { suggestions, options } = event.queryStringParameters;

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
        const allScores = scoreAlgorithems.map(algo => algo.calculateScore(suggestion));
        const score = allScores.reduce((scoreA, scoreB) => scoreA + scoreB);
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

    //by default we score the results by name and popularity of the location
    const defaultScoreAlgorithems = [
        new NameScoreAlgorithem(),
        new PopularityScoreAlgorithem()
    ];

    //if the caller provided his location score by distance too
    if (options.location) {
        defaultScoreAlgorithems.push(new DistanceScoreAlgorithem());
    }
    return defaultScoreAlgorithems;
}