from django.db import IntegrityError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profile
from rest_framework import status
import json


@api_view(["GET", "POST"])
def create(request):
    if request.method == "GET":
        return Response({"message": "This is a GET request"})
    elif request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        email = data.get("email")
        social_id = data.get("social_id")

        if not all([name, email, social_id]):
            return Response(
                {"error": "Missing required field"}, status=status.HTTP_400_BAD_REQUEST
            )
        try:
            profile, created = Profile.objects.get_or_create(
                email=email, defaults={"name": name, "social_id": social_id}
            )
            if created:
                return Response({"message": "Profile created successfully"})
            else:
                return Response({"message": "Profile already exists"})
        except IntegrityError:
            return Response(
                {"error": "Profile with this email or social id already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
