import { css } from 'glamor';

export const container = css({
    padding: '10px 1px',
    borderBottom:'1px dashed #333'
});

export const imageContainer = full => css({
    marginTop: '10px',
    overflow: 'hidden',
    maxHeight: !full ? '150px' : null,
    position: 'relative'
});

export const image = css({
    width: '100%'
});

export const shade = css({
    height: '40px',
    position: 'absolute',
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
    width: '100%'
});

export const titleRow = css({
    display: 'flex'
});

export const votes = css({
    margin: 'auto',
    fontWeight: 'bold',
    paddingRight: '10px',
    color: '#666'
});

export const title = css({
    flex: 1,
    lineHeight: '1.3'
});

export const links = css({
    marginTop: '5px',
    fontSize: 'smaller',
    color: '#666',
    lineHeight: '1.5'
});

export const linkItem = css({
    paddingRight: '3px',
    color: '#999',
    textDecoration: 'none'
});

export const iconComments = css({
    width: '13px',
    verticalAlign: 'middle'
});
