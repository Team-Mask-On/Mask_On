from django.db import models
from log.models import Log, AverageLog


class Sensor(models.Model):
    class Meta:
        db_table = "sensor"

    sensor_id = models.CharField(max_length=24)
    name = models.CharField(max_length=20)
    description = models.TextField()
    address = models.CharField(max_length=140)
    max_capacity = models.IntegerField()
    latitude = models.DecimalField(max_digits=10, decimal_places=6)
    longitude = models.DecimalField(max_digits=10, decimal_places=6)

    def current(self):
        data = {
            "masked": 0,
            "unmasked": 0,
			"average": {
	            "average_masked": 0,
	            "average_unmasked": 0
		    }
        }

        current_log = Log.objects.filter(sensor_id=self.sensor_id).order_by('-created')
        if current_log:
            recent_log = current_log[0]
            data["masked"] = recent_log.masked
            data["unmasked"] = recent_log.unmasked

            current_avg = AverageLog.objects.get(average_time=recent_log.time, sensor_id=recent_log.sensor_id)
            data["average"]["average_masked"] = current_avg.average_masked
            data["average"]["average_unmasked"] = current_avg.average_unmasked
        
        return data

    def __str__(self):
        return self.sensor_id
