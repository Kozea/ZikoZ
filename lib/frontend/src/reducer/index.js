import { combineReducers } from 'redux'

import api from '../api'
import initial from './initial'

const playlists = (state = initial.playlists, action) => {
  switch (action.type) {
    case 'CREATE_PLAYLIST':
      return [...state, { id: action.id, ...action.playlist }]
    default:
      return state
  }
}

export default combineReducers({
  playlists,
  api: combineReducers(api.reducers),
})
