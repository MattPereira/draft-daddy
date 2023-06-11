from .models import Team
import csv

# open nfl_teams.csv and prepare to insert into team model
with open("nfl_teams.csv", newline="") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        Team.objects.create(id=row["id"], name=row["name"], location=row["location"])
