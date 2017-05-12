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

export const miniselftext = css({
  maxHeight: '31px',
  padding: '10px 1px 0 1px',
  color: '#999',
  fontSize: 'smaller',
  overflow: 'hidden',
  display: 'block',
  textDecoration: 'none',
  wordBreak: 'break-word'
})

export const titleRow = css({
    display: 'flex'
});

export const sticky = stickied => css({
    borderLeft: stickied ? '2px solid rgb(70, 209, 96)' : null,
    paddingLeft: stickied ? '5px' : null
})

export const postMeta = css({
    fontSize: 'smaller',
    color: '#777'
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
  display: 'block',
  marginTop: '8px'
})

export const thumb_container = css({
  width: '70px',
  marginRight: '6px'
})

export const postFooter = css({
    marginTop: '10px'
});

export const footerComments = css({
    color: '#777'
})

export const selftext = css({
    paddingTop: '10px',
    textAlign: 'justify'
})
