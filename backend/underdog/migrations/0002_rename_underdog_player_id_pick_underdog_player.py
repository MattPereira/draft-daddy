# Generated by Django 4.2.1 on 2023-06-06 04:08

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("underdog", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="pick",
            old_name="underdog_player_id",
            new_name="underdog_player",
        ),
    ]
