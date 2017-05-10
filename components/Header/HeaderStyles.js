import { css } from 'glamor';

export const headerContainer = css({
    display: 'flex',
    borderBottom: '1px solid #333',
    padding: '11px 1px 0 1px'
})

export const title = css({
    flex: 1,
    fontSize: 'larger',
    padding: '14px 0'
})

export const user = css({
    textDecoration: 'none',
    color: '#ccc',
    padding: '18px 5px 15px 15px',
    fontSize: 'smaller'
})

export const sswitch = css({
  position: 'relative',
  display: 'inline-block',
  width: '40px',
  height: '24px',
  margin: '12px',
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
    width: '86px',
    margin: '13px',
    textTransform: 'lowercase'
})
