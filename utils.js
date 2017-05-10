export const formatToK = num => {
    if (num < 1000) return num;
    else if(num < 1000000)  return Math.floor(num/1000) + 'k'
    else return Math.floor(num/1000000) + 'm'
}

export const formatTimeAgo = timestamp => {
    const currentTime = Math.floor(Date.now()/1000);
    const timeAgo = currentTime - timestamp;
    let postfix = '';

    if(timeAgo < 60) return `${timeAgo}s${postfix}`
    else if(timeAgo < 60*60) return `${Math.round(timeAgo/60)}m${postfix}`
    else if(timeAgo < 60*60*24) return `${Math.round(timeAgo/(60*60))}h${postfix}`
    else if(timeAgo < 60*60*24*365) return `${Math.round(timeAgo/(60*60*24))}d${postfix}`
}

export function getCookieValue(a) {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}
