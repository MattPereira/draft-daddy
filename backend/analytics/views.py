from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import process_csv
from django.forms.models import model_to_dict

from underdog.models import Tournament, Draft, Pick


@api_view(["GET"])
def index(request):
    return Response({"message": "this is the root endpoing of analytics"})


@api_view(["GET"])
def tournaments(request):
    tournaments = Tournament.objects.all()

    tournaments_json = []

    for t in tournaments:
        # For each tournament, get the number of drafts for this user
        num_drafts = Draft.objects.filter(underdog_tournament=t).count()
        # Convert the tournament to a dict and add the number of drafts
        tournament_dict = model_to_dict(t)
        tournament_dict["num_drafts"] = num_drafts

        # Add the tournament dict to the list of tournaments
        tournaments_json.append(tournament_dict)

    return Response(tournaments_json)


@api_view(["POST"])
def csv_upload(request):
    # raw incoming data
    csv_file = request.FILES.get("csvFile")
    user_id = request.POST.get("userId")

    # handles inserting data into the database for a specific user
    process_csv(csv_file, user_id)

    return Response({"message": "successfully hit this post endpoint"})
