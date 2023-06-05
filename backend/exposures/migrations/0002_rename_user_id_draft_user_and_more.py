# Generated by Django 4.2.1 on 2023-06-05 00:15

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("exposures", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="draft",
            old_name="user_id",
            new_name="user",
        ),
        migrations.RenameField(
            model_name="matchup",
            old_name="away_team_id",
            new_name="away_team",
        ),
        migrations.RenameField(
            model_name="matchup",
            old_name="home_team_id",
            new_name="home_team",
        ),
        migrations.RenameField(
            model_name="pick",
            old_name="underdog_draft_id",
            new_name="underdog_draft",
        ),
        migrations.RenameField(
            model_name="pick",
            old_name="underdog_player_id",
            new_name="underdog_player",
        ),
        migrations.RenameField(
            model_name="player",
            old_name="team_id",
            new_name="team",
        ),
    ]
