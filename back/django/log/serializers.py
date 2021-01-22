from rest_framework import serializers
from .models import Log, AverageLog


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


# Sensor 의 로그 정보
class SensorLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        exclude = ()
