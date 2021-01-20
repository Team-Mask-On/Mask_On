from django.urls import path
from . import views

app_name = "logs"

urlpatterns = [
    path("<int:sensor_id>/", views.SensorLogView.as_view()),
]