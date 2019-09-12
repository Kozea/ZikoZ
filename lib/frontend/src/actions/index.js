export const createPlaylist = playlist => ({
  type: 'CREATE_PLAYLIST',
  playlist,
})

export const deletePlaylist = playlistId => ({
  type: 'DELETE_PLAYLIST',
  playlistId,
})
