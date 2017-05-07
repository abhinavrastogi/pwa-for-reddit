import { css } from 'glamor';

export const page = css({
    color: '#ccc'
});

export const comment = css({
    padding: '10px 0',
    borderBottom: '1px dashed #333'
});

export const bodyRow = css({
    display: 'flex'
});

export const body = css({
    flex: 1,
    lineHeight: '1.3'
});

export const upvotes = css({
    margin: 'auto',
    fontWeight: 'bold',
    paddingRight: '10px',
    color: '#666'
});

export const text = css({
    marginTop: '5px'
});

export const postMeta = css({
    color: '#666',
    fontSize: 'smaller'
});

export const repliesCount = css({
    padding: '5px 0',
    display: 'inline-block',
    color: '#999'
});

export const replies = css({
    marginLeft: '15px',
    borderLeft: '1px solid #333',
    paddingLeft: '20px'
});
