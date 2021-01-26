from django.urls import path
from . import views

app_name = "logs"

urlpatterns = [
    path("<str:sensor_id>/", views.SensorLogView.as_view()),
    path("log-data", views.ReceptLogView.as_view()),
    path("average/<str:sensor_id>/", views.AverageLogView.as_view()),
]