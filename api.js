export function fetchPosts(subreddit) {
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .catch(err => {console.log(err)})
}
