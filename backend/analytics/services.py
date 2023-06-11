import csv


def process_csv(csv_file, user_id):
    print("userId", user_id)
    # processes the csv file
    csv_data = csv_file.read().decode("utf-8")
    reader = csv.reader(csv_data.splitlines())
    rows = list(reader)
    print(rows[0:5])
