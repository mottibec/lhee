const axios = require('axios');

class AutocomplateServiceProxy {
    constructor(serviceUrl) {
        this.baseUrl = serviceUrl;
    }
    async getSuggestions(q) {
        const result = await axios.get(`${this.baseUrl}/autocomplete?q=${q}`);
        return result.data;
    }
}
module.exports = AutocomplateServiceProxy;