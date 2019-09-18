import logging
import os

from flask import Flask

from .model import Playlist, Tune, db

app = Flask(__name__)
app.config.from_envvar("FLASK_CONFIG")
db.init_app(app)


@app.cli.command()
def create_db():
    db.metadata.create_all(db.engine)


@app.cli.command()
def insert_data():

    playlist = Playlist(name="My Playlist", author="Cédric")
    tune_1 = Tune(
        artist="Stevie Wonder",
        title="Sir Duke",
        url="https://www.youtube.com/watch?v=6sIjSNTS7Fs",
    )
    tune_2 = Tune(
        artist="Snarky Puppy",
        title="Shofukan",
        url="https://www.youtube.com/watch?v=kk0WRHV_vt8",
    )

    playlist.tunes.extend([tune_1, tune_2])

    db.session()
    db.session.add(playlist)
    db.session.commit()
    db.session.remove()


if app.debug:
    level = (
        logging.INFO
        if os.getenv("PYTHON_VERBOSE", os.getenv("VERBOSE"))
        else logging.WARNING
    )
    app.logger.setLevel(level)
    logging.getLogger("sqlalchemy").setLevel(level)
    logging.getLogger("sqlalchemy").handlers = logging.getLogger("werkzeug").handlers
    logging.getLogger("sqlalchemy.orm").setLevel(logging.WARNING)
    logging.getLogger("unrest").setLevel(level)
    logging.getLogger("unrest").handlers = logging.getLogger("werkzeug").handlers
    if level == logging.WARNING:
        logging.getLogger("werkzeug").setLevel(level)

from .api import *  # noqa isort:skip
from .routes import *  # noqa isort:skip
