module.exports.autocompleteSuggestions = async event => {

  console.log(event);

  // get querystring variables
  const { q } = event.queryStringParameters;

  const trie = new Trie([]);

  //use a trie to effisally retrive all locations beguigng with q
  const autoComplateSuggestions = trie.find(q);

  // return 200 status code
  return {
    statusCode: 200,
    body: JSON.stringify(autoComplateSuggestions),
  }

}

class Trie {
  constructor(data) {

  }
  find(q) {
    return []
  }
}