from django.db import models

# Create your models here.

from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)  # Ensures each email is unique
    social_id = models.CharField(max_length=200, unique=True, null=True, blank=True)
