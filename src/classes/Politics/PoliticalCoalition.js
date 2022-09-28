class PoliticalCoalition {
    #accounts;
    #color;
    #name;

    get accounts() {
        return [...this.#accounts]
            .map(account => account.username);
    }

    get color() {
        return this.#color;
    }

    get name() {
        return this.#name;
    }

    constructor(name, color, accounts) {
        this.#accounts = new Set(accounts);
        this.#color = color;
        this.#name = name;
    }

    getAvgTweetLength() {
        return [...this.#accounts]
            .map(account => account.getAvgTweetLength())
            .reduce((sum, current) => sum + current, 0)
            / this.#accounts.size;
    }

    getAvgOfMetricOfTweets(metric) {
        return [...this.#accounts]
            .map(account => account.getAvgOfMetricPerTweet(metric))
            .reduce((sum, current) => sum + current, 0)
            / this.#accounts.size;
    }

    getSumOfMetric(metric) {
        return [...this.#accounts]
            .map(account => account.getSumOfMetric(metric))
            .reduce((sum, current) => sum + current, 0);
    }

    getTotalFollowersCount() {
        return [...this.#accounts]
            .map(account => account.followers_count)
            .reduce((sum, current) => sum + current, 0);
    }

    getTotalTweetCount() {
        return [...this.#accounts]
            .map(account => account.tweet_count)
            .reduce((sum, current) => sum + current, 0);
    }

    getTotalFetchedTweetCount() {
        return [...this.#accounts]
            .map(account => account.fetched_tweet_count)
            .reduce((sum, current) => sum + current, 0);
    }
}

module.exports = PoliticalCoalition;