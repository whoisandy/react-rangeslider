import React from 'react'

function Header () {
  return (
    <header className='block'>
      <h1>React Rangeslider</h1>
      <p>A fast & lightweight react component as a drop in replacement for HTML5 input range slider element.</p>
      <div className='github-buttons'>
        <a
          className='github-button'
          href='https://github.com/ntkme/github-buttons'
          data-style='mega'
          data-count-href='/whoisandie/react-rangeslider/stargazers'
          data-count-api='/repos/whoisandie/react-rangeslider#stargazers_count'
          data-count-aria-label='# stargazers on GitHub'
          aria-label='Star whoisandie/react-rangeslider on GitHub'>Star</a>
        <a
          className='github-button'
          href='https://github.com/whoisandie/react-rangeslider/fork'
          data-style='mega'
          data-count-href='/whoisandie/react-rangeslider/network'
          data-count-api='/repos/whoisandie/react-rangeslider#forks_count'
          data-count-aria-label='# forks on GitHub'
          aria-label='Fork whoisandie/react-rangeslider on GitHub'>Fork</a>
      </div>
      <p style={{marginTop: 20, textAlign: 'center'}}>Please refer to the source on <a href='http://github.com/whoisandie/react-rangeslider'>Github</a></p>
    </header>
  )
}

export default Header
