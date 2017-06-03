import React from 'react'
import GitHubButton from 'react-github-button'

function Header () {
  return (
    <section className='block'>
      <h1><a href='/'>React Rangeslider</a></h1>
      <p>
        A fast & lightweight react component as a drop in replacement for HTML5 input range slider element.
      </p>
      <p style={{ marginTop: 20, textAlign: 'center' }}>
        Please refer to the source on
        {' '}
        <a href='http://github.com/whoisandy/react-rangeslider'>Github</a>
      </p>
      <div style={{ textAlign: 'center' }}>
        <GitHubButton
          size='large'
          type='stargazers'
          namespace='whoisandy'
          repo='react-rangeslider'
        />
        <GitHubButton
          size='large'
          type='forks'
          namespace='whoisandy'
          repo='react-rangeslider'
        />
      </div>
    </section>
  )
}

export default Header
