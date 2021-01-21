from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from sensor.models import Sensor
from .models import Log, AverageLog
from .serializers import LogSerializer, SensorLogSerializer


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
            serializer = SensorLogSerializer(log, many=True).data
            return Response(serializer)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

# ############### 에러나는 부분 ############### #
class AverageLogView(APIView):

    def get_average_masked(self, pk):
        average_masked = []
        sensors = Sensor.objects.get(sensor_id=pk)
        average_logs = AverageLog.objects.filter(sensor_id=sensors)
        for average_log in average_logs:
            avg_masked = average_log.objects.filter("average_masked")
            average_masked.append(avg_masked)
        return average_masked

    def get_average_unmasked(self, pk):
        average_unmasked = []
        sensors = Sensor.objects.get(sensor_id=pk)
        average_logs = AverageLog.objects.filter(sensor_id=sensors)
        for average_log in average_logs:
            avg_unmasked = average_log.objects.get("average_unmasked")
            average_unmasked.append(avg_unmasked)
        return average_unmasked

    def get_current_time(self, pk):
        times = []
        sensors = Sensor.objects.get(sensor_id=pk)
        current_times = AverageLog.objects.filter(sensor_id=sensors)
        for current_time in current_times:
            ctimes = current_time.objects.get("created_time")
            times.append(ctimes)
        return times

    def get(self, request, sensor_id):
        average_masked = self.get_average_masked(sensor_id)
        average_unmasked = self.get_average_unmasked(sensor_id)
        current_time = self.get_current_time(sensor_id)
        for i in len(current_time):
            masked_respond = Response({'y': average_masked[i]}, {'x': current_time[i]})
            return masked_respond
        for j in len(current_time):
            unmasked_respond = Response({'y': average_unmasked[j]}, {"x": current_time[j]})
            return unmasked_respond