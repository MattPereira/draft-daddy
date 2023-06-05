from django.urls import path
from django.http import HttpResponse

from . import views

urlpatterns = [
    path("teams/", views.teams, name="exposures-teams"),
    path("players/", views.players, name="exposures-players"),
]
