const generateCoalitionCard = (color, name) => `
        <div class='card'>
            <div class='color' style='background:${color}'></div>
            <p class='name'>${name}</p>
            <button type='button' class='btn' onclick='location.href="coalition.html?name=${name}"'>Learn More</button>
        </div>`;

const generateAccountCard = (profile_image_url, handle, coalition) => `
        <div class='card'>
            <img src='${profile_image_url}'/>
            <div class='info'>
                <p class='name'>@${handle}</p>
                <p class='coalition'>${coalition}</p>
            </div>
            <button type='button' class='btn btn-danger' onclick='location.href="account.html?handle=${handle}"'>Learn More</button>
        </div>`;


$(document).ready(async () => {
    var names = [];
    var colors = [];

    var avg_likes = [];
    var avg_retweets = [];
    var avg_replies = [];
    var avg_len = [];

    const coalitions = await httpGet('/api/coalitions');

    for (let coalition of coalitions) {
        $('#cards-container').append(generateCoalitionCard(coalition.logo_color, coalition.name));
    
        const stats = await httpGet(`api/coalitions/${coalition.name}/stats`);

        names.push(coalition.name);
        colors.push(coalition.logo_color);
        
        avg_likes.push(stats.avg_likes_per_tweet.toFixed(2));
        avg_retweets.push(stats.avg_retweets_per_tweet.toFixed(2));
        avg_replies.push(stats.avg_replies_per_tweet.toFixed(2));
        avg_len.push(stats.avg_tweet_length.toFixed(2));
    }

    const accounts = await httpGet('/api/accounts');
    
    for (let account of accounts) {
        const profile = await httpGet(`api/accounts/${account.handle}/profile`);
        $('#accounts-container').append(generateAccountCard(profile.profile_image_url, profile.username, profile.coalition));
    }

    generateChart('doughnut', 'avgLikes', names, avg_likes, colors, 'Average Number of Likes for each Tweet Today');
    generateChart('doughnut', 'avgRetweets', names, avg_retweets, colors, 'Average Number of Retweets for each Tweet Today');
    generateChart('doughnut', 'avgReplies', names, avg_replies, colors, 'Average Number of Replies for each Tweet Today');
    generateChart('bar', 'avgTweetLen', names, avg_len, colors, 'Average Tweet Length (in characters) Today', false);

    finishLoading();
});