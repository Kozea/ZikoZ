import './Playlist.sass'

import React from 'react'
import block from 'bemboo'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import api from '../api'

@connect(
  null,
  dispatch => ({
    onDeletePlaylist: id => dispatch(api.actions.playlist.deleteItem({ id })),
  })
)
@block
export default class Playlist extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    const idTarget = this.props.id
    const { onDeletePlaylist } = this.props
    onDeletePlaylist(idTarget)
  }

  render(b) {
    const { name, author, tunes } = this.props

    const tunesList = tunes.length
      ? tunes.map(tune => (
          <div key={tunes.indexOf(tune)}>
            {tune.artist} - {tune.title}
            {' - '}
            <a href={tune.url} target="_blank" rel="noopener noreferrer">
              Listen
            </a>
          </div>
        ))
      : []

    return (
      <div className={b.e('playlist')}>
        <h3>
          {name} by {author}
        </h3>
        <div>{tunesList}</div>
        <div className={b.e('options')}>
          <Link to={`/edit-playlist/${this.props.id}`} className={b.e('edit')}>
            Edit the playlist
          </Link>
        </div>
      </div>
    )
  }
}
