from sqlalchemy import ForeignKey
from sqlalchemy.engine import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, scoped_session, sessionmaker
from sqlalchemy.sql.schema import Column
from sqlalchemy.types import Integer, String

Base = declarative_base()


class PlaylistTune(Base):
    __tablename__ = "playlist_tune"

    Base.metadata,
    playlist_id = Column(ForeignKey("playlist.id"), primary_key=True)
    tune_id = Column(ForeignKey("tune.id"), primary_key=True)


class Playlist(Base):
    __tablename__ = "playlist"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    author = Column(String)
    tunes = relationship(
        "Tune", secondary=PlaylistTune.__table__, back_populates="playlists"
    )

    __mapper_args__ = {"order_by": id}


class Tune(Base):
    __tablename__ = "tune"
    id = Column(Integer, primary_key=True, autoincrement=True)
    artist = Column(String)
    title = Column(String)
    url = Column(String)
    playlists = relationship(
        "Playlist", secondary=PlaylistTune.__table__, back_populates="tunes"
    )


class Db(object):
    def __init__(self):
        self.metadata = Base.metadata
        self.Session = sessionmaker()

    def init_app(self, app):
        self.app = app
        self.engine = create_engine(app.config["DB"])
        self.Session.configure(bind=self.engine)
        self.session = scoped_session(self.Session)

        @app.teardown_appcontext
        def teardown_appcontext(*args, **kwargs):
            db.session.remove()


db = Db()
