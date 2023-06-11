from django.db import IntegrityError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profile
from rest_framework import status
import json
from django.forms.models import model_to_dict


@api_view(["POST"])
def create(request):
    data = json.loads(request.body)
    name = data.get("name")
    email = data.get("email")
    provider_id = data.get("provider_id")
    provider_name = data.get("provider_name")

    if not all([name, email, provider_id, provider_name]):
        return Response(
            {"error": "Missing required field"}, status=status.HTTP_400_BAD_REQUEST
        )
    try:
        profile, created = Profile.objects.get_or_create(
            email=email,
            defaults={
                "name": name,
                "provider_id": provider_id,
                "provider_name": provider_name,
            },
        )
        profile_data = model_to_dict(profile)

        return Response(profile_data)
    except IntegrityError:
        return Response(
            {"error": "Profile with this email or social id already exists."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
