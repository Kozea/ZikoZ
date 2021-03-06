import './App.sass'

import block from 'bemboo'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import NotFound from './NotFound'
import Link from './utils/Link'
import PlaylistForm from './PlaylistForm'
import PlaylistEdit from './PlaylistEdit'

@block
export default class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      var: 1,
    }
  }

  render(b) {
    return (
      <main className={b}>
        <Helmet>
          <title>ZikoZ</title>
        </Helmet>
        <h1 className={b.e('main-title')}>ZikoZ</h1>
        <nav className={b.e('menu')}>
          <Link className={b.e('link')} exact to="/">
            Home
          </Link>
          <Link className={b.e('link')} to="/add-playlist">
            Add a playlist
          </Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add-playlist" component={PlaylistForm} />
          <Route path="/edit-playlist/:id" component={PlaylistEdit} />
          <Route component={NotFound} />
        </Switch>
      </main>
    )
  }
}
