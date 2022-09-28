function getHandleFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('handle');
}

function normalizeDate(d) {
    const date = new Date(d);
    return date.toLocaleString('en-GB');
}

$(document).ready(async () => {
    const handle = getHandleFromUrl();

    try {
        const profile = await httpGet(`/api/accounts/${handle}/profile`);
        const stats = await httpGet(`/api/accounts/${handle}/stats`);

        $('#name').text(profile.name);
        $('#handle').text('@' + profile.username);
        $('#description').text(`"${profile.description}"`);
        $('#created').html(`Account Created On: <b>${normalizeDate(profile.created_at)}</b>`);
        $('#profile_image').attr('src', profile.profile_image_url);

        $('#followers').text(profile.followers_count);
        $('#following').text(profile.following_count);
        $('#tweets').text(profile.tweet_count);
        $('#fetched').text(stats.fetched_tweets_count);

        $('#tot_likes').text(stats.total_likes);
        $('#tot_retweets').text(stats.total_retweets);
        $('#tot_replies').text(stats.total_replies);
        $('#avg_likes').text(stats.avg_likes_per_tweet.toFixed(2));
        $('#avg_retweets').text(stats.avg_retweets_per_tweet.toFixed(2));
        $('#avg_replies').text(stats.avg_replies_per_tweet.toFixed(2));
        $('#avg_length').html(stats.avg_tweet_length.toFixed(2) + '<sub> chars</sub>');

        if (profile.verified)
            $('#verified').removeAttr('hidden');

        finishLoading();
    }
    catch (err) { errorInLoading(err); } 
});