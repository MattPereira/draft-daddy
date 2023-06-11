from rest_framework.decorators import api_view
from rest_framework.response import Response
import csv


@api_view(["GET"])
def index(request):
    return Response({"message": "this is the root endpoing of analytics"})


@api_view(["POST"])
def csv_upload(request):
    # raw incoming data
    csv_file = request.FILES.get("csvFile")
    user_id = request.POST.get("userId")

    # processes the csv file
    csv_data = csv_file.read().decode("utf-8")
    reader = csv.reader(csv_data.splitlines())
    rows = list(reader)
    # print(rows[0])
    return Response({"message": "successfully hit this post endpoint"})
