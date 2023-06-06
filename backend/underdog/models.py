from django.db import models
from django.contrib.auth.models import User

from nfl.models import Player

# NOTES:
# Models create tables in psql db when you run 'python manage.py migrate'
# If you dont specify a primary key django automatically creates pk with field name "id" that is auto incrementing integer
# Django automatically creates a bunch of tables for users, permissions, sessions, and migrations
# Research django-social-auth for user authentication with google


class Tournament(models.Model):
    id = models.UUIDField(primary_key=True)
    title = models.CharField(max_length=100)
    entry_fee = models.PositiveIntegerField()
    total_prizes = models.PositiveIntegerField()
    field_size = models.PositiveIntegerField()


class Draft(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    underdog_draft_id = models.UUIDField(unique=True)
    underdog_tournament = models.ForeignKey(
        Tournament, on_delete=models.CASCADE, to_field="id"
    )


class Pick(models.Model):
    underdog_draft = models.ForeignKey(
        Draft,
        on_delete=models.CASCADE,
        to_field="underdog_draft_id",
    )
    pick_time = models.DateTimeField()
    pick_num = models.PositiveIntegerField()
    underdog_player = models.ForeignKey(
        Player, on_delete=models.CASCADE, to_field="underdog_id"
    )
