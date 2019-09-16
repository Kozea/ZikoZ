import './PlaylistForm.sass'

import block from 'bemboo'
import React from 'react'
import { Helmet } from 'react-helmet'
import Formol, { Field, Inliner } from 'formol'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { createPlaylist } from '../actions/index'

@withRouter
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
    this.state = { fieldsId: [] }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleRemoveField = this.handleRemoveField.bind(this)
  }

  handleSubmit(e) {
    const { createPlaylist } = this.props
    createPlaylist(e)
    this.props.history.push('/')
  }

  handleAddClick() {
    const { fieldsId } = this.state
    const lastId = fieldsId[fieldsId.length - 1]
    const newFieldId = lastId || lastId === 0 ? lastId + 1 : 0
    this.setState({ fieldsId: [...fieldsId, newFieldId] })
  }

  handleRemoveField(id) {
    const { fieldsId } = this.state
    this.setState({ fieldsId: [...fieldsId].filter(field => field !== id) })
  }

  render(b) {
    const { fieldsId } = this.state

    const fieldsList = fieldsId.map(fieldId => (
      <div key={fieldId}>
        <Inliner>
          <Field name={`tunes.${fieldId}.artist`}>Artist:</Field>
          <Field name={`tunes.${fieldId}.title`}>Title:</Field>
          <Field
            name={`tunes.${fieldId}.url`}
            pattern="http(s)?:\/\/.+"
            validityErrors={patternMismatch => {
              if (patternMismatch) {
                return 'This is not a correct URL.'
              }
            }}
          >
            Link:
          </Field>
          <div className={b.e('remove-container')}>
            <hr />
            <hr />
            <p
              className={b.e('remove')}
              onClick={() => this.handleRemoveField(fieldId)}
            >
              remove
            </p>
          </div>
        </Inliner>
      </div>
    ))

    return (
      <section className={b}>
        <Helmet>
          <title>ZikoZ - Create</title>
        </Helmet>
        <div className={b.e('container')}>
          <h2 className={b.e('title')}>Create a playlist</h2>
        </div>
        <div className={b.e('container')}>
          <Formol item={{}} onSubmit={this.handleSubmit} submitText="Create">
            <Field name="author">Your Name:</Field>
            <Field name="name">Playlist name:</Field>
            {fieldsList}
            <p className={b.e('add')} onClick={this.handleAddClick}>
              Add tune
            </p>
          </Formol>
        </div>
      </section>
    )
  }
}
