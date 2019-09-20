from unrest import UnRest

from .. import app, db
from ..model import Playlist, PlaylistTune, Tune

rest = UnRest(app, db.session)

tune = rest(Tune, methods=["GET", "POST", "PUT", "DELETE", "PATCH"], allow_batch=True)
playlist = rest(
    Playlist, methods=["GET", "POST", "DELETE", "PATCH"], relationships={"tunes": tune}
)
playlist_tune = rest(PlaylistTune, methods=["POST", "PUT", "DELETE"])


@tune.declare("POST", True)
def tune_post(payload, id=None):
    global tune
    global playlist

    playlist_id = payload["playlistId"]
    new_tune_checker = set(payload["new"].values())
    if None not in new_tune_checker:
        new_tune = tune.post(payload["new"])["objects"][0]
        playlist_tune.post({"playlist_id": playlist_id, "tune_id": new_tune["id"]})

    if payload.get("tunes") is not None:
        patch_payload = {"objects": payload["tunes"]}
        tune.patch(patch_payload)

    db.session.flush()
    new_playlist = playlist.get({"id": playlist_id})
    db.session.commit()

    return new_playlist
