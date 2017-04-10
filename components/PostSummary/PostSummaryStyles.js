import { css } from 'glamor';

export const container = css({
    display: 'flex',
    padding: '10px 10px 10px 10px',
    ':nth-child(odd)': {
        backgroundColor: '#fff'
    },
    ':nth-child(even)': {
        backgroundColor: '#f6f6f6'
    }
});

export const votes = css({

});

export const image = css({
    width: '75px',
    marginRight: '10px',
    paddingTop: '3px'
});

export const content = css({
    flex: 1
});

export const title = css({
    marginTop: '3px'
});

export const links = css({
    marginTop: '3px'
});

export const sublinks = css({
    fontSize: 'smaller',
    color: '#999',
    marginRight: '10px'
});

export const linkComments = css({
    // 'font-size': '12px'
    textDecoration: 'none',
    color: '#666'
});

export const linkAuthor = css({

});

export const linkSubreddit = css({

});

export const upvoteIcon = css({
    transform: 'rotate(-90deg)',
    display: 'inline-block',
    fontSize: 'smaller'
});
