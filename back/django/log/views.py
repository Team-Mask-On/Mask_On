from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from sensor.models import Sensor
from .models import Log, AverageLog
from .serializers import ReceptLogSerializer
from .serializers import LogSerializer

class SensorLogView(APIView):  
    def get(self, request, sensor_id):
        log = Log.objects.filter(sensor_id=sensor_id).order_by('-created')
        if log:
            serializer = LogSerializer(log, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class AverageLogView(APIView):
    def get(self, request, sensor_id):
        average_logs = AverageLog.objects.filter(sensor_id=sensor_id).order_by('average_time')
        if average_logs:
            data = {
                "masked": [],
                "unmasked":[]
            }
            for log in average_logs:
                data["masked"].append({"y":log.average_masked, "x":log.average_time})
                data["unmasked"].append({"y":log.average_unmasked, "x":log.average_time})
                print(log.average_time, log.average_masked)
                print(log.average_time, log.average_unmasked)
            # avg_serializer = AverageLogSerializer(average_logs, many=True)
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

# ## 수신 부분
class ReceptLogView(APIView):

    def get(self, request):
        return Response(status=status.HTTP_200_OK)

    def post(self, request):
        log_serializer = ReceptLogSerializer(data=request.data)
        if log_serializer.is_valid():
            log_serializer.save()
            return Response(log_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)