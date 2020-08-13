const AutocomplateServiceProxy = require("../services/autocomplateServiceProxy");
const ScoreServiceProxy = require("../services/scoreServiceProxy");

const getSuggestions = async event => {

  console.log(event);

  // get querystring variables
  const { q, latitude, longitude } = event.queryStringParameters;

  //service proxy (not sure what the best practice in serverless is)
  const autocompleteService = new AutocomplateServiceProxy();
  const scoreService = new ScoreServiceProxy();

  //call autocompleteService to get an array of cities that start with the q param
  const suggestions = await autocompleteService.getSuggestions(q);

  //call the score service to score each item by multiple algorithems
  const scoredSuggestions = await scoreService.ScoreSuggestions(q, { latitude, longitude }, suggestions);

  //order the results by the score
  const orderedResults = scoredSuggestions.sort((s1, s2) => s2.score - s1.score);

  // return 200 status code
  return {
    statusCode: 200,
    body: JSON.stringify(orderedResults),
  }

}
module.exports.getSuggestions = getSuggestions