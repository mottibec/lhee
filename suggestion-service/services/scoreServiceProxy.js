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
        return await axios.post(`${this.baseUrl}/score`, data);
    }
}
module.exports = ScoreServiceProxy;