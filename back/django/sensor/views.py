from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SensorSerializer
from .models import Sensor


class SensorView(APIView):

    def get(self, request):
        sensors = Sensor.objects.all()
        serializer = SensorSerializer(sensors, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)



