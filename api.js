export function fetchPosts(subreddit) {
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .catch(err => {console.log(err)})
}

export function fetchComments(subreddit, post_id, post_title) {
    return fetch(`https://www.reddit.com/r/${subreddit}/comments/${post_id}/${post_title}.json`)
        .then(response => response.json())
        .catch(err => {console.log(err)})
}
