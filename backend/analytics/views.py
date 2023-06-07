from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import csv


def index(request):
    return HttpResponse("The home page for the analytics app")


@csrf_exempt
def csv_upload(request):
    if request.method == "POST":
        csv_file = request.FILES.get("csvFile")
        user_id = request.POST.get("userId")
        csv_data = csv_file.read().decode("utf-8")
        reader = csv.reader(csv_data.splitlines())
        rows = list(reader)
        print(rows[0])
        return JsonResponse({"message": "successfully hit this post endpoint"})
    else:
        return JsonResponse({"error": "Invalid request method"})
