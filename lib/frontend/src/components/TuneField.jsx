import './TuneField.sass'

import block from 'bemboo'
import React from 'react'
import { Field, Inliner } from 'formol'
import { connect } from 'react-redux'

import { removeTune } from '../actions/index'

@connect(
  null,
  dispatch => ({
    onRemoveTune: (tuneId, playlistId) =>
      dispatch(removeTune(tuneId, playlistId)),
  })
)
@block
export default class TuneField extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleRemoveTune = this.handleRemoveTune.bind(this)
  }

  handleRemoveTune(tuneId, playlistId) {
    const { onRemoveTune } = this.props
    onRemoveTune(tuneId, playlistId)
  }

  render(b) {
    const { tuneId, playlistId } = this.props

    return (
      <div>
        <Inliner>
          <Field name={`tunes.${tuneId}.id`} hidden />
          <Field name={`tunes.${tuneId}.artist`}>Artist:</Field>
          <Field name={`tunes.${tuneId}.title`}>Title:</Field>
          <Field
            name={`tunes.${tuneId}.url`}
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
              onClick={() => this.handleRemoveTune(tuneId, playlistId)}
            >
              remove
            </p>
          </div>
        </Inliner>
      </div>
    )
  }
}
