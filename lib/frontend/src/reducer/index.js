import { combineReducers } from 'redux'

import api from '../api'
import initial from './initial'

const playlists = (state = initial.playlists, action) => {
  switch (action.type) {
    case 'CREATE_PLAYLIST': {
      const newId = state.length ? state.slice(-1)[0].id + 1 : 0
      return [...state, { id: newId, ...action.playlist }]
    }
    case 'DELETE_PLAYLIST': {
      return [...state].filter(playlist => playlist.id !== action.playlistId)
    }
    default:
      return state
  }
}

export default combineReducers({
  playlists,
  api: combineReducers(api.reducers),
})
