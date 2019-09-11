let nextId = 3
export const createPlaylist = playlist => ({
  type: 'CREATE_PLAYLIST',
  id: nextId++,
  playlist,
})
