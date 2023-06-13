from django.urls import path

from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("csv-upload", views.csv_upload, name="csv-upload"),
    path("tournaments", views.tournaments, name="tournaments"),
]
