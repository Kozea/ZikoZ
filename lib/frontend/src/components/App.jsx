import './App.sass'

import block from 'bemboo'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router-dom'

import { Redirect } from '../utils'
// import Async from './Async'
// import Dates from './Dates'
import Db from './Db'
import Home from './Home'
import NotFound from './NotFound'
import Link from './utils/Link'
import PlaylistForm from './PlaylistForm'

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
          <Link className={b.e('link')} to="/db">
            Db
          </Link>
          {/* <Link className={b.e('link')} to="/async"> */}
          {/* This component is async */}
          {/* </Link> */}
          {/* <Link className={b.e('link').m({ active: true })}
          to="/broken_link"> */}
          {/* This link is dead */}
          {/* </Link> */}
          {/* <Link className={b.e('link')} to="/old/date"> */}
          {/* This page has move to /date */}
          {/* </Link> */}
        </nav>
        <Switch>
          <Redirect status={303} from="/old/date" to="/date" />
          <Route exact path="/" component={Home} />
          <Route path="/add-playlist" component={PlaylistForm} />
          <Route path="/db" component={Db} />
          {/* <Route path="/async" component={Async} /> */}
          <Route component={NotFound} />
        </Switch>
      </main>
    )
  }
}
