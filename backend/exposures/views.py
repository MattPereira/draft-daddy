from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

# Create your views here.


def teams(request):
    return JsonResponse(
        {
            "teams": [
                "LAR",
                "CIN",
                "SF",
            ]
        }
    )


def players(request):
    return JsonResponse({"players": ["Joe Burrow", "Jimmy Garoppolo"]})
