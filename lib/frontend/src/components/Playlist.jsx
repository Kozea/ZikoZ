import './Playlist.sass'

import React from 'react'
import block from 'bemboo'
import { Link } from 'react-router-dom'

@block
export default class Playlist extends React.PureComponent {
  render(b) {
    const { name, author, tunes } = this.props

    return (
      <div className={b.e('playlist')}>
        <h3>
          {name} by {author}
        </h3>
        <div>
          {tunes.length
            ? tunes.map(tune => (
                <div key={tune.id}>
                  {tune.artist} - {tune.title}
                  {' - '}
                  <a href={tune.url} target="_blank" rel="noopener noreferrer">
                    Listen
                  </a>
                </div>
              ))
            : null}
        </div>
        <div className={b.e('options')}>
          <Link to={`/edit-playlist/${this.props.id}`} className={b.e('edit')}>
            Edit the playlist
          </Link>
        </div>
      </div>
    )
  }
}
