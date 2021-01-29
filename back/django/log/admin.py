from django.contrib import admin
from . import models


@admin.register(models.Log)
class LogAdmin(admin.ModelAdmin):
    pass


@admin.register(models.AverageLog)
class AverageLog(admin.ModelAdmin):
    pass

