const request = require('request');
const DateOperations = require('./DateOperations');

require('dotenv').config();

class TwitterAPI {
    static #bearerToken = process.env.BEARER_TOKEN;

    static async #fetchData(url) {
        const data = {
            url: url,
            method: 'GET',
            headers: {
                Authorization: 'BEARER ' + TwitterAPI.#bearerToken,
                'Content-Type': 'application/json'
            }
        };

        return new Promise((resolve, reject) => {
            request(data, (error, response, body) => {
                if (!error && response.statusCode === 200) resolve(body);
                else reject(false);
            })
        })
        .then((res) => res)
        .catch((err) => null);
    }

    static #normalizeHandle(handle) {
        return handle[0] === '@' ? handle.slice(1) : handle;
    }

    static async getUserIdByHandle(handle) {
        handle = TwitterAPI.#normalizeHandle(handle);
        const data = await TwitterAPI.#fetchData(`https://api.twitter.com/2/users/by/username/${handle}`);
        return data ? JSON.parse(data)['data']['id'] : null;
    }

    static async getUserInfoById(id) {
        const data = await TwitterAPI.#fetchData(`https://api.twitter.com/2/users/${id}?user.fields=verified,public_metrics,description,created_at,profile_image_url`);
        return data ? JSON.parse(data)['data'] : null;
    }

    static async getUserInfoByHandle(handle) {
        handle = TwitterAPI.#normalizeHandle(handle);
        const data = await TwitterAPI.#fetchData(`https://api.twitter.com/2/users/by/username/${handle}?user.fields=verified,public_metrics,description,created_at,profile_image_url`);
        return data ? JSON.parse(data)['data'] : null;
    }

    static async getUserTweetsWithinMinutes(id, minutes) {
        const startTime = DateOperations.goMinutesBackFromNow(minutes);
        const data = await TwitterAPI.#fetchData(`https://api.twitter.com/2/users/${id}/tweets?max_results=100&start_time=${startTime}&tweet.fields=id,public_metrics,created_at`);
        return data ? JSON.parse(data)['data'] : null;
    }

    static async getUserTweetsWithinHours(id, hours) {
        const startTime = DateOperations.goHoursBackFromNow(hours);
        const data = await TwitterAPI.#fetchData(`https://api.twitter.com/2/users/${id}/tweets?max_results=100&start_time=${startTime}&tweet.fields=id,public_metrics,created_at`);
        return data ? JSON.parse(data)['data'] : null;
    }

    static async getUserTweetsWithinDays(id, days) {
        const startTime = DateOperations.goDaysBackFromNow(days);
        const data = await TwitterAPI.#fetchData(`https://api.twitter.com/2/users/${id}/tweets?max_results=100&start_time=${startTime}&tweet.fields=id,public_metrics,created_at`);
        return data ? JSON.parse(data)['data'] : null;
    }
}

module.exports = TwitterAPI