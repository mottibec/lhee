module.exports.getSuggestions = async event => {

  console.log(event);

  // get querystring variables
  const { q, latitude, longitude } = event.queryStringParameters;

  //todo call real services
  const autocompleteService = {
    getSuggestions: q => q
  };
  const scoreService = {
    score: (q, location, suggestions) => suggestions
  };

  //call autocompleteService to get an array of cities that start with the q param
  const suggestions = autocompleteService.getSuggestions(q);

  //call the score service to score each item by multiple algorithems
  const scoredSuggestions = scoreService.score(q, { latitude, longitude }, suggestions);

  //order the results by the score
  const orderedResults = scoredSuggestions.sort((s1, s2) => s2.score - s1.score);

  // return 200 status code
  return {
    statusCode: 200,
    body: JSON.stringify(orderedResults),
  }

}