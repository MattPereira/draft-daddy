from django.db import models
from django.contrib.auth.models import User

# NOTES:
# Models create tables in psql db when you run 'python manage.py migrate'
# If you dont specify a primary key django automatically creates pk with field name "id" that is auto incrementing integer
# Django automatically creates a bunch of tables for users, permissions, sessions, and migrations
# Research django-social-auth for user authentication with google


class Draft(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    underdog_draft_id = models.UUIDField(editable=False)
    underdog_tournament_id = models.UUIDField(editable=False)
    tournament_title = models.CharField(max_length=50)
    entry_fee = models.PositiveIntegerField()
    total_prizes = models.PositiveIntegerField()
    tournament_size = models.PositiveIntegerField()


# Team id will be the abbreviation of the team name i.e. "LAR" or "SF"
class Team(models.Model):
    id = models.CharField(max_length=3, primary_key=True, editable=False)
    name = models.CharField(max_length=50)
    location = models.CharField(max_length=50)


class Player(models.Model):
    underdog_id = models.UUIDField(editable=False)
    name = models.CharField(max_length=50)
    position = models.CharField(max_length=2)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)


class Pick(models.Model):
    underdog_draft = models.ForeignKey(Draft, on_delete=models.CASCADE, editable=False)
    pick_time = models.DateTimeField()
    pick_num = models.PositiveIntegerField()
    underdog_player = models.OneToOneField(Player, on_delete=models.CASCADE)


class Matchup(models.Model):
    season_year = models.PositiveIntegerField()
    week_num = models.PositiveIntegerField()
    home_team = models.ForeignKey(
        Team, on_delete=models.CASCADE, related_name="home_team"
    )
    away_team = models.ForeignKey(
        Team, on_delete=models.CASCADE, related_name="away_team"
    )
