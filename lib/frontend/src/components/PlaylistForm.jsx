import './PlaylistForm.sass'

import block from 'bemboo'
import React from 'react'
import { Helmet } from 'react-helmet'
import Formol, { Field } from 'formol'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import api from '../api'

@withRouter
@connect(
  null,
  dispatch => ({
    onCreatePlaylist: playlist => dispatch(api.actions.playlist.post(playlist)),
  })
)
@block
export default class PlaylistForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { isAddingTune: false, isEditing: false }
    this.handlePlaylistSubmit = this.handlePlaylistSubmit.bind(this)
  }

  async handlePlaylistSubmit(item) {
    const { onCreatePlaylist } = this.props

    const response = await onCreatePlaylist(item)
    this.props.history.push(`/edit-playlist/${response.objects[0].id}`)
  }

  render(b) {
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
            item={{}}
            onSubmit={this.handlePlaylistSubmit}
            submitText="Create"
            className={b.e('playlist')}
          >
            <Field name="id" hidden />
            <Field name="author" required>
              Your Name:
            </Field>
            <Field name="name">Playlist name:</Field>
          </Formol>
        </div>
      </section>
    )
  }
}
