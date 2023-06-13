from django.core.management.base import BaseCommand
from nfl.models import Team
import csv


# execute this entire script with -> python manage.py populate_db
class Command(BaseCommand):
    help = "Populate database from csv"

    def handle(self, *args, **options):
        with open("nfl/management/commands/nfl_teams.csv", newline="") as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Team.objects.get_or_create(
                    id=row["id"], name=row["name"], location=row["location"]
                )


# add function to handle nfl_matchup_data
