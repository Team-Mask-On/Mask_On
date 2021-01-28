from rest_framework import serializers
from .models import Log, AverageLog
from sensor.models import Sensor

class LogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Log
        fields = ("id", "created", "masked", "unmasked")

# ### 수신 부분
class ReceptLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        exclude = ()
    def validate_sensor_id(self, value):
        try:
            sensor = Sensor.objects.get(sensor_id=value)
        except:
            raise serializers.ValidationError("sensor_id가 등록되어 있어야 합니다.")
        return value