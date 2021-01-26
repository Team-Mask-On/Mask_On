from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from log.serializers import ReceptLogSerializer
from .serializers import SensorSerializer
from .models import Sensor


class SensorView(APIView):

    def get(self, request):
        sensors = Sensor.objects.all()
        serializer = SensorSerializer(sensors, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


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
