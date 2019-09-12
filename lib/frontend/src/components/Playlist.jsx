import './Playlist.sass'

import React from 'react'
import block from 'bemboo'

@block
export default class Playlist extends React.PureComponent {
  render(b) {
    const { name, author, tunes } = this.props
    var tunesList

    if (!tunes) {
      tunesList = null
    } else {
      tunesList = tunes.map(tune => (
        <div key={tunes.indexOf(tune)}>
          {tune.artist} {tune.title}{' '}
          <a href={tune.url} target="_blank" rel="noopener noreferrer">
            Listen
          </a>
        </div>
      ))
    }

    return (
      <div className={b.e('playlist')}>
        <h3>
          {name} by {author}
        </h3>
        <div>{tunesList}</div>
      </div>
    )
  }
}
