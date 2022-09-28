const TwitterAPI = require('../TwitterAPI');

class PoliticalAccount {
    #id;
    #name;
    #username;
    #coalition;

    #created_at;
    #description;
    #profile_image_url;
    #verified;

    #followers_count;
    #following_count;
    #tweet_count;

    #tweets;

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get username() {
        return this.#username;
    }

    get coalition() {
        return this.#coalition;
    }

    get created_at() {
        return this.#created_at;
    }
    
    get description() {
        return this.#description;
    }

    get profile_image_url() {
        return this.#profile_image_url;
    }

    get verified() {
        return this.#verified;
    }

    get followers_count() {
        return this.#followers_count;
    }

    get following_count() {
        return this.#following_count;
    }
    
    get tweet_count() {
        return this.#tweet_count;
    }

    get fetched_tweet_count() {
        return this.#tweets.size;
    }

    constructor(handle, coalition) {
        this.#tweets = new Set();
        this.#username = handle;
        this.#coalition = coalition;
    }

    async fetchData() {
        const id = await TwitterAPI.getUserIdByHandle(this.#username);
        const info = await TwitterAPI.getUserInfoById(id);
        const tweets = await TwitterAPI.getUserTweetsWithinDays(id, 1);

        this.#id = id;
        this.#name = info.name;
        this.#username = info.username;
        
        this.#created_at = info.created_at;
        this.#description = info.description;
        this.#profile_image_url = info.profile_image_url.replace('_normal', '');
        this.#verified = info.verified;

        this.#followers_count = info.public_metrics.followers_count;
        this.#following_count = info.public_metrics.following_count;
        this.#tweet_count = info.public_metrics.tweet_count;

        this.#tweets.clear();
        if (tweets) tweets.forEach((tweet) => this.#tweets.add(tweet));
    }

    getAvgTweetLength() {
        if (this.#tweets.size <= 0) return 0;

        return [...this.#tweets]
            .map(tweet => tweet['text'].length)
            .reduce((sum, current) => sum + current, 0)
            / this.#tweets.size;
    }

    getAvgOfMetricPerTweet(metric) {
        if (this.#tweets.size <= 0) return 0;
        return this.getSumOfMetric(metric) / this.#tweets.size;
    }

    getSumOfMetric(metric) {
        return [...this.#tweets]
            .map(tweet => tweet['public_metrics'][metric])
            .reduce((sum, current) => sum + current, 0);
    }
}

module.exports = PoliticalAccount;