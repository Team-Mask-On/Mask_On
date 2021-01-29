from rest_framework import serializers
from log.serializers import LogSerializer
from .models import Sensor


class SensorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sensor
        fields = ("sensor_id", "name", "description", "address", "max_capacity", "latitude", "longitude", "current")
