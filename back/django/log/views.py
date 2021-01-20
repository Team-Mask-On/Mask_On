from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Log, AverageLog
from .serializers import LogSerializer, SensorLogSerializer


# Sensor 의 로그 정보 ViewSet
class SensorLogView(APIView):

    def get_log(self, pk):
        try:
            logs = Log.objects.filter(sensor_id=pk)
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