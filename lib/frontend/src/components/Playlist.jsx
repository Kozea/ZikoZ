import './Playlist.sass'

import React from 'react'
import block from 'bemboo'
import { connect } from 'react-redux'

import { deletePlaylist } from '../actions/index'

@connect(
  null,
  dispatch => ({
    deletePlaylist: playlist => dispatch(deletePlaylist(playlist)),
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
    const { deletePlaylist } = this.props
    deletePlaylist(idTarget)
  }

  render(b) {
    const { name, author, tunes } = this.props
    var tunesList

    if (!tunes) {
      tunesList = null
    } else {
      tunesList = tunes.map(tune => (
        <div key={tunes.indexOf(tune)}>
          {tune.artist} - {tune.title}
          {' - '}
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
        <div className={b.e('options')}>
          <button className={b.e('delete')} onClick={this.handleDelete}>
            Delete
          </button>
        </div>
      </div>
    )
  }
}
