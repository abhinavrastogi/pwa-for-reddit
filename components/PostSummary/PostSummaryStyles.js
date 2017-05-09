import { css } from 'glamor';

export const container = css({
    padding: '10px 0',
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

export const blue = css({
    color: '#24a0ed'
})

export const green = css({
    color: 'rgb(70, 209, 96)'
})

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

export const postMeta = css({
    fontSize: 'smaller',
    marginBottom: '5px',
    color: '#999'
})

export const metaItem = css({
    textDecoration: 'none',
    padding: '5px 5px 5px 2px'
})

export const title = css({
    flex: 1,
    lineHeight: '1.3',
    padding: '0 2px'
});

export const titleText = css({
  textDecoration: 'none',
  color: '#ccc',
  display: 'block'
})

export const gif_thumb = css({
    width: '65px',
    height: '65px',
    marginRight: '6px'
});

export const postFooter = css({
    marginTop: '5px',
    fontSize: 'smaller',
    color: '#777'
});

export const votes = css({
})
