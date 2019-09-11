import './PlaylistForm.sass'

import block from 'bemboo'
import React from 'react'
import { Helmet } from 'react-helmet'
import Formol, { Field } from 'formol'
import { connect } from 'react-redux'

import { createPlaylist } from '../actions/index'

@connect(
  null,
  dispatch => ({
    createPlaylist: playlist => dispatch(createPlaylist(playlist)),
  })
)
@block
export default class PlaylistForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    const { createPlaylist } = this.props
    createPlaylist(e)
  }

  render(b) {
    return (
      <section className={b}>
        <Helmet>
          <title>ZikoZ - Create</title>
        </Helmet>
        <h2 className={b.e('title')}>Create a playlist</h2>
        <Formol onSubmit={this.handleSubmit} submitText="Create">
          <Field name="author">Your Name:</Field>
          <Field name="name">Playlist name:</Field>
        </Formol>
      </section>
    )
  }
}
