import './Home.sass'

import block from 'bemboo'
import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'

import Playlist from './Playlist'
import api from '../api'

@withRouter
@connect(
  state => ({
    playlists: state.api.playlist,
  }),
  dispatch => ({
    sync: () => dispatch(api.actions.playlist.get()),
  })
)
@block
export default class Home extends React.PureComponent {
  componentDidMount() {
    const { sync } = this.props
    sync()
  }

  render(b) {
    const { playlists } = this.props

    return (
      <section className={b}>
        <Helmet>
          <title>ZikoZ - Home</title>
        </Helmet>
        <div className={b.e('container')}>
          <h2 className={b.e('title')}>Playlists</h2>
        </div>
        <div className={b.e('playlists')}>
          {playlists.loading ? (
            <p>Chargement...</p>
          ) : (
            playlists.objects.map(playlist => (
              <Playlist
                key={playlist.id}
                id={playlist.id}
                name={playlist.name}
                author={playlist.author}
                tunes={playlist.tunes || []}
              />
            ))
          )}
        </div>
      </section>
    )
  }
}
