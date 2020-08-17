const axios = require('axios');

class ScoreServiceProxy {
    constructor(serviceUrl) {
        this.baseUrl = serviceUrl;
    }
    async ScoreSuggestions(suggestions, q, latitude, longitude) {
        const data = {
            suggestions: suggestions,
            options: {
                q: q,
                latitude: latitude,
                longitude: longitude
            }
        }
        console.log(`calling score service at ${this.baseUrl}/score with ${JSON.stringify(data)}`);
        const result = await axios.post(`${this.baseUrl}/score`, data);
        console.log(`score ${JSON.stringify(result)}`);
        return result.data;
    }
}
module.exports = ScoreServiceProxy;