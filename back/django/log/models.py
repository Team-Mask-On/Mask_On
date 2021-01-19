from django.db import models
from core.models import DateTimeStampedModel


class Log(DateTimeStampedModel):

    sensor_id = models.ForeignKey("sensor.Sensor", on_delete=models.CASCADE, related_name="log")
    masked = models.IntegerField()
    unmasked = models.IntegerField()


class AverageLog(models.Model):

    created_time = models.TimeField(auto_now_add=False)
    sensor_id = models.ForeignKey("sensor.Sensor", on_delete=models.CASCADE, default=None)
    masked = models.IntegerField()
    unmasked = models.IntegerField()