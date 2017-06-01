import React from 'react'

function Header () {
  return (
    <header className='block'>
      <h1>React Rangeslider</h1>
      <p>
        A fast & lightweight react component as a drop in replacement for HTML5 input range slider element.
      </p>
      <div className='github-buttons'>
        <a
          class='github-button'
          href='https://github.com/whoisandy/react-rangeslider'
          data-icon='octicon-star'
          data-size='large'
          data-show-count='true'
          aria-label='Fork whoisandy/react-rangeslider on GitHub'
        >
          Star
        </a>
        <a
          class='github-button'
          href='https://github.com/whoisandy/react-rangeslider/fork'
          data-icon='octicon-repo-forked'
          data-size='large'
          data-show-count='true'
          aria-label='Fork whoisandy/react-rangeslider on GitHub'
        >
          Fork
        </a>
      </div>
      <p style={{ marginTop: 20, textAlign: 'center' }}>
        Please refer to the source on
        {' '}
        <a href='http://github.com/whoisandy/react-rangeslider'>Github</a>
      </p>
    </header>
  )
}

export default Header
