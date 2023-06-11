from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import process_csv


@api_view(["GET"])
def index(request):
    return Response({"message": "this is the root endpoing of analytics"})


@api_view(["POST"])
def csv_upload(request):
    # raw incoming data
    csv_file = request.FILES.get("csvFile")
    user_id = request.POST.get("userId")

    # handles inserting data into the database for a specific user
    process_csv(csv_file, user_id)

    return Response({"message": "successfully hit this post endpoint"})
