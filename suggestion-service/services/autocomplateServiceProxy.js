const axios = require('axios');

class AutocomplateServiceProxy {
    constructor(serviceUrl) {
        this.baseUrl = serviceUrl;
    }
    async getSuggestions(q) {
        console.log(`calling autocomplate service at ${this.baseUrl}/autocomplete?q=${q}`);
        const result = await axios.get(`${this.baseUrl}/autocomplete?q=${q}`);
        console.log(`score ${JSON.stringify(result)}`);
        return result.data;
    }
}
module.exports = AutocomplateServiceProxy;