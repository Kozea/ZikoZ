import React from 'react'
import { Field } from 'formol'

export default class TuneForm extends React.PureComponent {
  render() {
    return (
      <div>
        <Field>Title</Field>
        <Field>Artist</Field>
        <Field>Link</Field>
      </div>
    )
  }
}
