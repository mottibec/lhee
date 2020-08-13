class ScoreAlgorithem {
    calculateScore() {
        return 0.0;
    }
    normalizeScore(score) {
        if (score > 1) {
            return 1;
        }
        if (score < 0) {
            return 0;
        }
        return score;
    }
}

//score by the distance of the parameter from the complated loaction name
class NameScoreAlgorithem extends ScoreAlgorithem {
    calculateScore(suggestion, options) {
        if (!options.q.length) {
            return 0;
        }
        const diff = options.q.length / suggestion.name.length;
        return this.normalizeScore(diff);
    }
}

//score by the distance from the location
class DistanceScoreAlgorithem extends ScoreAlgorithem {
    calculateScore(suggestion, options) {
        const distance = this.calculateDistance(
            suggestion.latitude,
            suggestion.longitude,
            options.latitude,
            options.longitude)
        const score = 1 - distance / 6371 * 2;
        return this.normalizeScore(score);
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        //https://www.movable-type.co.uk/scripts/latlong.html
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceInMeters = R * c; // in metres
        return distanceInMeters;
    }
}

module.exports = { NameScoreAlgorithem, DistanceScoreAlgorithem }