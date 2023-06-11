from django.db import models

# Create your models here.

from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    provider_id = models.IntegerField(unique=True)
    provider_name = models.CharField(max_length=200)
