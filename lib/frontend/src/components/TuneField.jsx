import './TuneField.sass'

import block from 'bemboo'
import React from 'react'
import { Field, Inliner } from 'formol'

@block
export default class TuneField extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }

  handleRemoveClick(tuneId) {
    this.props.onRemoveClick(tuneId)
  }

  render(b) {
    const { formId, id, add } = this.props

    return (
      <div>
        <Inliner>
          {add ? null : <Field name={`tunes.${formId}.id`} hidden />}
          <Field
            name={add ? 'new.artist' : `tunes.${formId}.artist`}
            required={add}
          >
            Artist:
          </Field>
          <Field
            name={add ? 'new.title' : `tunes.${formId}.title`}
            required={add}
          >
            Title:
          </Field>
          <Field
            name={add ? 'new.url' : `tunes.${formId}.url`}
            required={add}
            pattern="http(s)?:\/\/.+"
            validityErrors={patternMismatch => {
              if (patternMismatch) {
                return 'This is not a correct URL.'
              }
            }}
          >
            Link:
          </Field>
          {add ? null : (
            <div className={b.e('remove-container')}>
              <hr />
              <hr />
              <p
                className={b.e('remove')}
                onClick={() => this.handleRemoveClick(id)}
              >
                remove
              </p>
            </div>
          )}
        </Inliner>
      </div>
    )
  }
}
