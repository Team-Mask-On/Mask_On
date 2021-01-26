from core.models import DateTimeStampedModel
from django.db import models


class Log(DateTimeStampedModel):
    class Meta:
       db_table = "log"

    #sensor_id = models.ForeignKey("sensor.Sensor", on_delete=models.CASCADE, to_field="sensor_id")
    sensor_id = models.CharField(max_length=50)
    masked = models.IntegerField()
    unmasked = models.IntegerField()
    #average = models.ForeignKey("log.AverageLog", on_delete=models.CASCADE, blank=True, null=True,)
    average_id = models.IntegerField()

    def __str__(self):
        return str(self.sensor_id)


class AverageLog(models.Model):
    class Meta:
        db_table = "average"

    created_time = models.TimeField(auto_now_add=False)
    sensor_id = models.CharField(max_length=50)
    average_masked = models.IntegerField()
    average_unmasked = models.IntegerField()
    time = models.CharField(max_length=10)

    def __str__(self):
        return str(self.sensor_id)