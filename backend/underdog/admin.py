from django.contrib import admin

# Register your models here.

from .models import Pick, Draft, Tournament

admin.site.register(Tournament)
admin.site.register(Pick)
admin.site.register(Draft)
