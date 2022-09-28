function getCoalitionNameFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('name');
}

$(document).ready(async () => {
    const name = getCoalitionNameFromUrl();

    try {
        const profile = await httpGet(`/api/coalitions/${name}/profile`);
        const stats = await httpGet(`/api/coalitions/${name}/stats`);

        if (profile.accounts.length === 0)
            throw "Coalition does not contain accounts";

        $('#edit-button').attr('href', `/edit.html?name=${profile.name}`);

        $('#name').text(profile.name);
        $('#color').css('background', profile.color);

        $('#followers').text(profile.total_followers_count);
        $('#tweets').text(profile.total_tweet_count);
        $('#fetched').text(stats.total_fetched_tweet_count);

        $('#tot_likes').text(stats.total_likes);
        $('#tot_retweets').text(stats.total_retweets);
        $('#tot_replies').text(stats.total_replies);
        $('#avg_likes').text(stats.avg_likes_per_tweet.toFixed(2));
        $('#avg_retweets').text(stats.avg_retweets_per_tweet.toFixed(2));
        $('#avg_replies').text(stats.avg_replies_per_tweet.toFixed(2));
        $('#avg_length').html(stats.avg_tweet_length.toFixed(2) + '<sub> chars</sub>');

        for (let account of profile.accounts)
            $('#handles').append(`<li class='list-group-item'><a href='account.html?handle=${account}'>@${account}</a></li>`);

        finishLoading();
    }
    catch (err) { errorInLoading(err); } 
});