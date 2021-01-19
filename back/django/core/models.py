from django.db import models


class DateTimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
