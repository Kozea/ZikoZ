import React from 'react'

export default class Playlist extends React.PureComponent {
  constructor(props) {
    super(props)
    this.playlist = 'My Playlist'
  }

  render() {
    const { name, author } = this.props

    return (
      <div>
        <p>
          {name} by {author}
        </p>
      </div>
    )
  }
}
