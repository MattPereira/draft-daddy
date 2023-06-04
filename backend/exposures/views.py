from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def team(request):
    return HttpResponse("Exposures by team")


def player(request):
    return HttpResponse("Exposures by player")
