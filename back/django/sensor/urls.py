from django.urls import path
from . import views

app_name = "sensor"

urlpatterns = [
    path("", views.SensorView.as_view()),
    path("log-data/", views.ReceptLogView.as_view()),
]