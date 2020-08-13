const axios = require('axios');

class AutocomplateServiceProxy {
    constructor(serviceUrl) {
        this.baseUrl = serviceUrl;
    }
    async getSuggestions(q) {
        return await axios.get(`${this.baseUrl}/autocomplete?q=${q}`);
    }
}
module.exports = AutocomplateServiceProxy;