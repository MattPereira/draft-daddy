import csv

teams = [
    ["ARI", "Cardinals", "Arizona"],
    ["ATL", "Falcons", "Atlanta"],
    ["BAL", "Ravens", "Baltimore"],
    ["BUF", "Bills", "Buffalo"],
    ["CAR", "Panthers", "Carolina"],
    ["CHI", "Bears", "Chicago"],
    ["CIN", "Bengals", "Cincinnati"],
    ["CLE", "Browns", "Cleveland"],
    ["DAL", "Cowboys", "Dallas"],
    ["DEN", "Broncos", "Denver"],
    ["DET", "Lions", "Detroit"],
    ["GB", "Packers", "Green Bay"],
    ["HOU", "Texans", "Houston"],
    ["IND", "Colts", "Indianapolis"],
    ["JAX", "Jaguars", "Jacksonville"],
    ["KC", "Chiefs", "Kansas City"],
    ["LV", "Raiders", "Las Vegas"],
    ["LAC", "Chargers", "Los Angeles"],
    ["LAR", "Rams", "Los Angeles"],
    ["MIA", "Dolphins", "Miami"],
    ["MIN", "Vikings", "Minnesota"],
    ["NE", "Patriots", "New England"],
    ["NO", "Saints", "New Orleans"],
    ["NYG", "Giants", "New York"],
    ["NYJ", "Jets", "New York"],
    ["PHI", "Eagles", "Philadelphia"],
    ["PIT", "Steelers", "Pittsburgh"],
    ["SEA", "Seahawks", "Seattle"],
    ["SF", "49ers", "San Francisco"],
    ["TB", "Buccaneers", "Tampa Bay"],
    ["TEN", "Titans", "Tennessee"],
    ["WAS", "Commanders", "Washington"],
]

with open("nfl_teams.csv", "w", newline="") as csvfile:
    fieldnames = ["id", "name", "location"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for team in teams:
        writer.writerow({"id": team[0], "name": team[1], "location": team[2]})
