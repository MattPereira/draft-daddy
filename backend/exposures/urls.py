from django.urls import path
from django.http import HttpResponse

from . import views

urlpatterns = [
    path("team/", views.team, name="exposures-team"),
    path("player/", views.player, name="exposures-player"),
]
