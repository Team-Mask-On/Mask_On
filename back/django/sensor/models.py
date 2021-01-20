from django.db import models


class Sensor(models.Model):

    sensor_id = models.CharField(max_length=24)
    name = models.CharField(max_length=20)
    description = models.TextField()
    address = models.CharField(max_length=140)
    max_capacity = models.IntegerField()
    latitude = models.DecimalField(max_digits=10, decimal_places=6)
    longitude = models.DecimalField(max_digits=10, decimal_places=6)

    def __str__(self):
        return self.name
