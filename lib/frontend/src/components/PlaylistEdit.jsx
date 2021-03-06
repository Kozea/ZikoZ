import './PlaylistEdit.sass'

import block from 'bemboo'
import React from 'react'
import { Helmet } from 'react-helmet'
import Formol, { Field } from 'formol'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import TuneField from './TuneField'
import api from '../api'

@withRouter
@connect(
  state => ({
    playlist: state.api.playlist,
  }),
  dispatch => ({
    sync: () => dispatch(api.actions.playlist.force.get()),
    onDeletePlaylist: id => dispatch(api.actions.playlist.deleteItem({ id })),
    onEditPlaylist: playlist =>
      dispatch(api.actions.playlist.patchItem({ id: playlist.id }, playlist)),
    onAddTune: async item => {
      const response = await dispatch(api.actions.tune.post(item))
      if (response.metadata.code === 200) {
        dispatch(api.actions.playlist.force.getItem({ id: item.playlistId }))
      }
    },
    onRemoveTune: async (tuneId, playlistId) => {
      const response = await dispatch(
        api.actions.tune.deleteItem({ id: tuneId })
      )
      if (response.metadata.code === 200) {
        dispatch(api.actions.playlist.force.getItem({ id: playlistId }))
      }
    },
  })
)
@block
export default class PlaylistEdit extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { isAddingTune: false, isEditing: false }
    this.handlePlaylistSubmit = this.handlePlaylistSubmit.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleDeletePlaylist = this.handleDeletePlaylist.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.sync(parseInt(id))
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params
    if (prevProps.match.params.id !== id) {
      this.props.sync(parseInt(id))
    }
  }

  async handlePlaylistSubmit(item) {
    const { onEditPlaylist } = this.props
    await onEditPlaylist(item)
    this.setState({ isEditing: false })
  }

  handleDeletePlaylist(id) {
    const { onDeletePlaylist } = this.props
    onDeletePlaylist(id)
    this.props.history.push('/')
  }

  handleAddClick() {
    this.setState({ isAddingTune: true })
  }

  handleEditClick() {
    this.setState({ isEditing: true })
  }

  render(b) {
    const {
      playlist,
      match: {
        params: { id },
      },
    } = this.props

    const { isAddingTune, isEditing } = this.state

    const targetPlaylist = playlist.objects.filter(p => p.id === parseInt(id))

    const item =
      !playlist.loading && targetPlaylist.length ? targetPlaylist[0] : {}

    return (
      <section className={b}>
        <Helmet>
          <title>ZikoZ - Create</title>
        </Helmet>
        <div className={b.e('container')}>
          <h2 className={b.e('title')}>
            {id ? 'Edit the playlist' : 'Create a playlist'}
          </h2>
        </div>
        <div>
          {playlist.loading || !targetPlaylist.length ? (
            <div className={b.e('container')}>
              <div className="loader" />
            </div>
          ) : (
            <>
              {isEditing ? (
                <div className={b.e('container')}>
                  <Formol
                    item={item}
                    onSubmit={this.handlePlaylistSubmit}
                    submitText={id ? 'Validate' : 'Create'}
                    className={b.e('playlist')}
                  >
                    <Field name="id" hidden />
                    <Field name="author" required>
                      Your Name:
                    </Field>
                    <Field name="name">Playlist name:</Field>
                  </Formol>
                </div>
              ) : (
                <div className={b.e('container-col')}>
                  <h3>
                    {item.name} by {item.author}
                  </h3>
                  <p className={b.e('edit')} onClick={this.handleEditClick}>
                    Change playlist name
                  </p>
                  <hr />
                </div>
              )}

              <div className={b.e('container')}>
                <Formol
                  item={item}
                  onSubmit={async tuneItem => {
                    await this.props.onAddTune({
                      ...tuneItem,
                      playlistId: item.id,
                    })
                    this.setState({ isAddingTune: false })
                  }}
                  submitText="Save changes"
                >
                  {item.tunes.length
                    ? item.tunes
                        .sort((x, y) => x.id - y.id)
                        .map(tune => (
                          <TuneField
                            key={tune.id}
                            id={tune.id}
                            formId={item.tunes.indexOf(tune)}
                            onRemoveClick={tuneId =>
                              this.props.onRemoveTune(tuneId, item.id)
                            }
                          />
                        ))
                    : !isAddingTune && (
                        <>
                          <p>Add your first tune:</p>
                          <TuneField add />
                        </>
                      )}
                  {isAddingTune ? (
                    <div>
                      <TuneField
                        onCancelClick={() =>
                          this.setState({ isAddingTune: false })
                        }
                        add
                      />
                    </div>
                  ) : item.tunes.length ? (
                    <p className={b.e('add')} onClick={this.handleAddClick}>
                      Add tune
                    </p>
                  ) : null}
                </Formol>
              </div>
              <div className={b.e('container')}>
                <p
                  className={b.e('delete')}
                  onClick={() => this.handleDeletePlaylist(item.id)}
                >
                  Delete playlist
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    )
  }
}
