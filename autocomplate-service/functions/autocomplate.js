const csv = require('csv-parser')
const fs = require('fs')
const createTrie = require('autosuggest-trie');

module.exports.autocompleteSuggestions = async event => {

  console.log(event);

  // get query from query string
  const { q } = event.queryStringParameters;

  const cities = await getCtiesFromFile();
  const trie = createTrie(cities, 'name');
  const autoComplateSuggestions = trie.getMatches(q);

  // return 200 status code
  return {
    statusCode: 200,
    body: JSON.stringify(autoComplateSuggestions),
  }
}

const getCtiesFromFile = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream('./data/cities.tsv')
      .pipe(csv({ separator: '\t' }))
      .on('data', (data) => {
        if (data.population && data.population >= 5000) {
          results.push(formatCity(data))
        }
      })
      .on('end', () => resolve(results));
  })
};

const formatCity = (data) => {
  return {
    "name": `${data.name}, ${data.admin1}, ${data.country}`,
    "latitude": data.lat,
    "longitude": data.long,
  }
}
