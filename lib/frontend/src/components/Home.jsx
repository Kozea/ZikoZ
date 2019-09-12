import './Home.sass'

import block from 'bemboo'
import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'

import Playlist from './Playlist'

@withRouter
@connect(state => ({ playlists: state.playlists }))
@block
export default class Home extends React.PureComponent {
  render(b) {
    const { playlists } = this.props

    const listPlaylists = playlists.map(function(playlist) {
      if (!playlist.tunes) {
        return (
          <Playlist
            key={playlist.id}
            id={playlist.id}
            name={playlist.name}
            author={playlist.author}
          />
        )
      }
      return (
        <Playlist
          key={playlist.id}
          id={playlist.id}
          name={playlist.name}
          author={playlist.author}
          tunes={playlist.tunes}
        />
      )
    })

    return (
      <section className={b}>
        <Helmet>
          <title>ZikoZ - Home</title>
        </Helmet>
        <h2 className={b.e('title')}>Playlists</h2>
        <div className={b.e('playlists')}>{listPlaylists}</div>
      </section>
    )
  }
}
