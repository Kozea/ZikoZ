import './PlaylistForm.sass'

import block from 'bemboo'
import React from 'react'
import { Helmet } from 'react-helmet'
import Formol, { Field } from 'formol'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { createPlaylist, editPlaylist, addTune } from '../actions/index'
import TuneField from './TuneField'

@withRouter
@connect(
  state => ({
    playlists: state.playlists,
  }),
  dispatch => ({
    onCreatePlaylist: playlist => dispatch(createPlaylist(playlist)),
    onEditPlaylist: playlist => dispatch(editPlaylist(playlist)),
    onAddTune: playlist => dispatch(addTune(playlist)),
  })
)
@block
export default class PlaylistForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddField = this.handleAddField.bind(this)
    this.setPlaylistId = this.setPlaylistId.bind(this)
  }

  setPlaylistId() {
    const { playlists } = this.props
    const id = playlists.length ? playlists.slice(-1)[0].id + 1 : 0
    return id
  }

  handleSubmit(item) {
    const { onCreatePlaylist, onEditPlaylist } = this.props
    if (item.id) {
      onEditPlaylist(item)
      this.props.history.push('/')
    } else {
      item.id = this.setPlaylistId()
      item.tunes = []
      onCreatePlaylist(item)
      this.props.history.push(`/edit-playlist/${item.id}`)
    }
  }

  handleAddField(item) {
    const { onAddTune } = this.props
    onAddTune(item)
  }

  render(b) {
    const {
      playlists,
      match: {
        params: { id },
      },
    } = this.props

    const item = id
      ? playlists.find(playlist => playlist.id === parseInt(id))
      : {}

    return (
      <section className={b}>
        <Helmet>
          <title>ZikoZ - Create</title>
        </Helmet>
        <div className={b.e('container')}>
          <h2 className={b.e('title')}>Create a playlist</h2>
        </div>
        <div className={b.e('container')}>
          <Formol
            item={item}
            onSubmit={this.handleSubmit}
            submitText={id ? 'Validate' : 'Create'}
          >
            <Field name="id" hidden />
            <Field name="author" required>
              Your Name:
            </Field>
            <Field name="name">Playlist name:</Field>
            {Object.keys(item).length
              ? item.tunes.map(tune => (
                  <TuneField
                    key={tune.id}
                    tuneId={tune.id}
                    playlistId={item.id}
                  />
                ))
              : null}
            {id ? (
              <p
                className={b.e('add')}
                onClick={() => this.handleAddField(item)}
              >
                Add tune
              </p>
            ) : null}
          </Formol>
        </div>
      </section>
    )
  }
}
