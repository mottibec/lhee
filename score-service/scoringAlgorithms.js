class ScoreAlgorithem {
    constructor() {
    }
    calculateScore() {
        return 0.0;
    }
}

//score by the distance of the parameter from the complated loaction name
class NameScoreAlgorithem extends ScoreAlgorithem {
    constructor() {
        super();
    }
    calculateScore(q, suggestion) {
        const diff = suggestion.name.length - q.length;
        return diff * 0.1;
    }
}

//score by the population of the location
class PopularityScoreAlgorithem extends ScoreAlgorithem {
    constructor() {
        super();
    }
    calculateScore(suggestion) {
        const range = suggestion.population > 0;
        return range * 0.1;
    }
}

//score by the distance from the location
class DistanceScoreAlgorithem extends ScoreAlgorithem {
    constructor() {
        super();
    }
    calculateScore(location, suggestion) {
        const distance = location.distanceFrom(suggestion.location);
        return distance * 0.1;
    }
}

module.exports = { NameScoreAlgorithem, PopularityScoreAlgorithem, DistanceScoreAlgorithem }