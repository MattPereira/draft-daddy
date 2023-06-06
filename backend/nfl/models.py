from django.db import models


# Create your models here.
class Team(models.Model):
    id = models.CharField(max_length=3, primary_key=True)
    name = models.CharField(max_length=50)
    location = models.CharField(max_length=50)


class Player(models.Model):
    name = models.CharField(max_length=50)
    position = models.CharField(max_length=2)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    underdog_id = models.UUIDField(unique=True)


class Matchup(models.Model):
    season_year = models.PositiveIntegerField()
    week_num = models.PositiveIntegerField()
    home_team = models.ForeignKey(
        Team, on_delete=models.CASCADE, related_name="home_team"
    )
    away_team = models.ForeignKey(
        Team, on_delete=models.CASCADE, related_name="away_team"
    )
