from rest_framework import serializers
from .models import Log, AverageLog
from sensor.models import Sensor


# 모든 Sensor 정보 Serializer
class RelatedLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AverageLog
        fields = ("average_masked", "average_unmasked", )


class LogSerializer(serializers.ModelSerializer):
    average = RelatedLogSerializer(read_only=True)

    class Meta:
        model = Log
        fields = ("masked", "unmasked", "average", )


# Sensor 별 평균 masked/unmasked 정보 Serializer
class AverageLogMaskedSerializer(serializers.ModelSerializer):
    class Meta:
        model = AverageLog
        fields = ("average_masked", "created_time",)


class AverageLogUnmaskedSerializer(serializers.ModelSerializer):
    class Meta:
        model = AverageLog
        fields = ("average_unmasked", "created_time",)


# ### 수신 부분
class ReceptLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Log
        fields = ("sensor_id", "masked", "unmasked", )


# Sensor 의 로그 정보
class SensorLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        exclude = ()
