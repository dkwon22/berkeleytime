"""Playlist Store."""
import logging

from catalog import models  # all roads lead to catalog.models
from mondaine.service.entity.playlist import Playlist

logger = logging.getLogger(__name__)


class PlaylistStore(object):
    """Playlist interface with Postgres database."""

    def get_or_create(self, playlist):
        """Get or create a single playlist."""
        entry, created = models.Playlist.objects.get_or_create(
            name=playlist.name,
            defaults=playlist.flatten()
        )

        if not created:
            for key, value in playlist.flatten().items():
                setattr(entry, key, value)
            entry.save()

        return Playlist(entry.__dict__, strict=False)

    def add_course_ids(self, playlist_id, course_ids):
        """Add a list of course_ids to a single playlist."""
        # plalist = models.Playlist.get(id=playlist_id)
        pass

    def replace_course_ids(self, playlist_id, course_ids):
        """Replace a single playlist's existing courses."""
        playlist = models.Playlist.objects.get(id=playlist_id)
        playlist.courses = course_ids
        logger.info({
            'message': 'Playlist course ids replaced',
            'name': playlist.name,
            'id': playlist_id,
            'courses': len(course_ids),
        })
        playlist.save()

playlist_store = PlaylistStore()
