import { css } from 'glamor';

export const headerContainer = css({
    display: 'flex',
    borderBottom: '1px solid #333',
    padding: '0 1px',
    position: 'sticky',
    top: 0,
    background: '#000'
})

export const title = css({
    flex: 1,
    padding: '7px 0'
})

export const titleText = css({
    fontSize: 'larger'
})

export const subs = css({
    fontSize: '12.5px',
    color: '#777',
    paddingLeft: '6px'
})

export const user = css({
    textDecoration: 'none',
    color: '#ccc',
    padding: '11px 5px 11px 11px',
    fontSize: 'smaller'
})

export const userLoggedIn = css({
    fontSize: 'smaller',
    color: '#777'
})

export const sswitch = css({
  position: 'relative',
  display: 'inline-block',
  width: '40px',
  height: '24px',
  margin: '7px',
  ' input': {
      display: 'none',
      ':checked': {
          ' + div': {
              backgroundColor: '#2196F3',
              ':before': {
                  transform: 'translateX(16px)'
              }
          }
      }
  }
})

/* The slider */
export const slider = css({
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#666',
  transition: '.4s',
  borderRadius: '24px',
  ':before': {
      position: 'absolute',
      content: "'.'",
      height: '16px',
      width: '16px',
      left: '5px',
      bottom: '4px',
      backgroundColor: 'white',
      transition: '.4s',
      borderRadius: '50%'
  }
})

export const inputSubreddit = css({
    outline: 'none',
    border: '1px solid #666',
    borderRadius: '24px',
    padding: '3px 10px',
    color: '#fff',
    backgroundColor: '#000',
    width: '90px',
    margin: '7px',
    textTransform: 'lowercase'
})
