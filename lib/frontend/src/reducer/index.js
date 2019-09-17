import { combineReducers } from 'redux'

import api from '../api'
import initial from './initial'

const playlists = (state = initial.playlists, action) => {
  switch (action.type) {
    case 'CREATE_PLAYLIST': {
      return [...state, { ...action.playlist }]
    }
    case 'DELETE_PLAYLIST': {
      return [...state].filter(playlist => playlist.id !== action.playlistId)
    }
    case 'EDIT_PLAYLIST': {
      return [...state].map(playlist =>
        playlist.id === action.playlist.id ? action.playlist : playlist
      )
    }
    case 'ADD_TUNE': {
      const {
        playlist: { tunes },
      } = action
      const lastId = tunes.length ? tunes[tunes.length - 1].id : 0
      return [...state].filter(p =>
        p === action.playlist ? tunes.push({ id: lastId + 1 }) : p
      )
    }
    case 'REMOVE_TUNE': {
      const { playlistId, tuneId } = action
      const playlist = state.find(p => p.id === playlistId)
      return [...state].filter(p =>
        p === playlist
          ? (p.tunes = playlist.tunes.filter(t => t.id !== tuneId))
          : p
      )
    }
    default:
      return state
  }
}

export default combineReducers({
  playlists,
  api: combineReducers(api.reducers),
})
