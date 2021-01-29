from core.models import DateTimeStampedModel
from django.db import models
from django.db.models import Avg


class AverageLog(models.Model):
    class Meta:
        db_table = "average"

    average_time = models.CharField(max_length=10)
    sensor_id = models.CharField(max_length=50)
    average_masked = models.IntegerField()
    average_unmasked = models.IntegerField()

    def __str__(self):
        return str(self.sensor_id)

class Log(DateTimeStampedModel):
    class Meta:
       db_table = "log"

    masked = models.IntegerField()
    unmasked = models.IntegerField()
    sensor_id = models.CharField(max_length=50)
    time = models.CharField(max_length=10)

    def __str__(self):
        return str(self.sensor_id)

    def save(self, force_insert=False, force_update=False, *args, **kwargs):
        super(Log, self).save(force_insert, force_update, *args, **kwargs)
        # you can add this for only existing model object
        if self.sensor_id:
            # You can check if only 'price' field changed
            masked_avg = Log.objects.filter(sensor_id=self.sensor_id, time=self.time).aggregate(Avg('masked'))['masked__avg']
            unmasked_avg = Log.objects.filter(sensor_id=self.sensor_id, time=self.time).aggregate(Avg('unmasked'))['unmasked__avg']
            masked_avg = round(masked_avg)
            unmasked_avg = round(unmasked_avg)
            
            exist = AverageLog.objects.filter(average_time=self.time, sensor_id=self.sensor_id)
            if exist:
                exist.update(average_masked=masked_avg, average_unmasked=unmasked_avg)
            else:
                AverageLog.objects.create(average_time=self.time, sensor_id=self.sensor_id, average_masked=masked_avg, average_unmasked=unmasked_avg)