from django.contrib import admin

from .models import Player, Team, Matchup

# Register your models here.

admin.site.register(Player)
admin.site.register(Team)
admin.site.register(Matchup)
