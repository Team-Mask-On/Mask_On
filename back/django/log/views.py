from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from sensor.models import Sensor
from .models import Log, AverageLog
from .serializers import LogSerializer, SensorLogSerializer, AverageLogMaskedSerializer, AverageLogUnmaskedSerializer


# Sensor 의 로그 정보 View
class SensorLogView(APIView):

    def get_log(self, pk):
        try:
            sensors = Sensor.objects.get(sensor_id=pk)
            logs = Log.objects.filter(sensor_id=sensors)
            return logs
        except Log.DoesNotExist:
            return None

    def get(self, request, sensor_id):
        log = self.get_log(sensor_id)
        if log is not None:
            print(log)
            serializer = SensorLogSerializer(log, many=True).data
            return Response(serializer)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class AverageLogView(APIView):

    def get_average_masked(self, pk):
        sensors = Sensor.objects.get(sensor_id=pk)
        average_logs = AverageLog.objects.filter(sensor_id=sensors)
        return average_logs

    def get_average_unmasked(self, pk):
        sensors = Sensor.objects.get(sensor_id=pk)
        average_logs = AverageLog.objects.filter(sensor_id=sensors)
        return average_logs

    def get_current_time(self, pk):
        sensors = Sensor.objects.get(sensor_id=pk)
        current_times = AverageLog.objects.filter(sensor_id=sensors)
        return current_times

    def get(self, request, sensor_id):
        average_masked = self.get_average_masked(sensor_id)
        average_unmasked = self.get_average_unmasked(sensor_id)
        serializer_masked = AverageLogMaskedSerializer(average_masked, many=True).data
        serializer_unmasked = AverageLogUnmaskedSerializer(average_unmasked, many=True).data
        return Response({"masked": serializer_masked, "unmasked": serializer_unmasked})
