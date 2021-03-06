import { getCookieValue } from './utils';

export function fetchPosts(subreddit, after, auth = true) {
    const access_token = auth && getCookieValue('access_token');

    const prefix = subreddit === 'frontpage' && access_token ? 'oauth' : 'www';
    const postfix = subreddit === 'frontpage' && access_token ? '' : '.json';
    const headers = subreddit === 'frontpage' && access_token ? { 'Authorization': `bearer ${access_token}` } : {};
    const subredditUrl = subreddit === 'frontpage' && access_token ? '' : `/r/${subreddit.toLowerCase()}`;
    // console.log({auth, subreddit, access_token, prefix, postfix, headers, subredditUrl});
    return fetch(`https://${prefix}.reddit.com${subredditUrl}${postfix}?raw_json=1${after ? `&after=${after}` : ''}`, { headers })
        .then(response => response.ok ? response.json() : Promise.reject(response.json()))
}

export function fetchComments(subreddit, post_id, post_title) {
    return fetch(`https://www.reddit.com/r/${subreddit.toLowerCase()}/comments/${post_id}/${post_title}.json?raw_json=1`)
        .then(response => response.json())
}

export function fetchAboutSubreddit(subreddit) {
    return fetch(`https://www.reddit.com/r/${subreddit.toLowerCase()}/about/.json?raw_json=1`)
        .then(response => response.json())
}

export function fetchUserInfo() {
    const access_token = getCookieValue('access_token');
    return access_token
        ? fetch('https://oauth.reddit.com/api/v1/me', {
            headers: {
                'Authorization': `bearer ${access_token}`
            }
        })
            .then(response => response.json())
        : Promise.reject('No auth token');
}
