export const createPlaylist = playlist => ({
  type: 'CREATE_PLAYLIST',
  playlist,
})

export const deletePlaylist = playlistId => ({
  type: 'DELETE_PLAYLIST',
  playlistId,
})

export const editPlaylist = playlist => ({
  type: 'EDIT_PLAYLIST',
  playlist,
})

export const addTune = playlist => ({
  type: 'ADD_TUNE',
  playlist,
})

export const removeTune = (tuneId, playlistId) => ({
  type: 'REMOVE_TUNE',
  tuneId,
  playlistId,
})
