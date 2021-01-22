from django.db import models
from core.models import DateTimeStampedModel


class Log(DateTimeStampedModel):

    sensor_id = models.ForeignKey("sensor.Sensor", on_delete=models.CASCADE, related_name="log")
    masked = models.IntegerField()
    unmasked = models.IntegerField()
    average = models.ForeignKey("log.AverageLog", on_delete=models.CASCADE, blank=True, null=True,)

    def __str__(self):
        return str(self.sensor_id)


class AverageLog(models.Model):

    created_time = models.TimeField(auto_now_add=False)
    sensor_id = models.ForeignKey("sensor.Sensor", on_delete=models.CASCADE, default=None)
    average_masked = models.IntegerField()
    average_unmasked = models.IntegerField()

    def __str__(self):
        return str(self.sensor_id)