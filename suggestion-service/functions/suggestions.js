const AutocomplateServiceProxy = require("../services/autocomplateServiceProxy");
const ScoreServiceProxy = require("../services/scoreServiceProxy");
const NodeCache = require("node-cache");
const config = require("../config");

const getSuggestions = async event => {
  const key = `${event.path}/${JSON.stringify(event.queryStringParameters)}`;

  try {
    const suggestions = await getOrSet(key, () => findSuggestions(event.queryStringParameters));
    // return 200 status code
    return {
      statusCode: 200,
      body: JSON.stringify(suggestions),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.message),
    }
  }




}
const findSuggestions = async (queryStringParameters) => {

  // get querystring variables
  const { q, latitude, longitude } = queryStringParameters;

  console.log(`findSuggestions q=${q} latitude=${latitude} longitude=${longitude}`);

  //service proxy (not sure what the best practice in serverless is)
  const autocompleteService = new AutocomplateServiceProxy(config.autocomplateServiceUrl);
  const scoreService = new ScoreServiceProxy(config.scoreServiceUrl);

  //call autocompleteService to get an array of cities that start with the q param
  const suggestions = await autocompleteService.getSuggestions(q);

  //call the score service to score each item by multiple algorithems
  const scoredSuggestions = await scoreService.ScoreSuggestions(suggestions, q, latitude, longitude);

  //order the results by the score
  const orderedResults = scoredSuggestions.sort((s1, s2) => s2.score - s1.score);
  return orderedResults;
}

const getOrSet = async (key, action) => {
  const requestCache = new NodeCache();
  const cachedSuggestions = requestCache.get(key);
  if (cachedSuggestions) {
    return cachedSuggestions;
  }
  const suggestions = await action();
  requestCache.set(key, suggestions);
  return suggestions;
}
module.exports.getSuggestions = getSuggestions