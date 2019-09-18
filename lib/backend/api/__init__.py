from unrest import UnRest

from .. import app, db
from ..model import Playlist, Tune

rest = UnRest(app, db.session)
playlist = rest(Playlist, methods=["GET", "POST", "PUT", "DELETE"])
tune = rest(Tune, methods=["GET", "POST", "PUT", "DELETE"])
