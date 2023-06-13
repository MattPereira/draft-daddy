import csv
from underdog.models import Tournament, Draft, Pick
from nfl.models import Player
import io


def process_csv(csv_file, user_id):
    # processes the csv file
    data_set = csv_file.read().decode("UTF-8")
    io_string = io.StringIO(data_set)
    reader = csv.DictReader(io_string)

    # order -> tournament -> draft -> player -> pick
    for row in reader:
        # get_or_create() avoids creating duplicates and returns tuple (object, created)
        # where object is the retrieved or created object and created is a boolean specifying whether a new object was created.
        Tournament.objects.get_or_create(
            id=row["Tournament"],
            defaults={
                "title": row["Tournament Title"],
                "field_size": row["Tournament Size"],
                "entry_fee": int(float(row["Tournament Entry Fee"])),
                "total_prizes": int(float(row["Tournament Total Prizes"])),
            },
        )

        Draft.objects.get_or_create(
            user_id=user_id,
            underdog_draft_id=row["Draft"],
            underdog_tournament_id=row["Tournament"],
        )

        Player.objects.get_or_create(
            underdog_id=row["Appearance"],
            name=row["First Name"] + " " + row["Last Name"],
            position=row["Position"],
            team_id=row["Team"] if row["Team"] != "" else "UFA",
        )

        Pick.objects.get_or_create(
            underdog_draft_id=row["Draft"],
            pick_time=row["Picked At"].replace(" UTC", "Z"),
            pick_num=row["Pick Number"],
            underdog_player_id=row["Appearance"],
        )
