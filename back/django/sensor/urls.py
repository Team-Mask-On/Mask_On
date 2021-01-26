from django.urls import path
from . import views

app_name = "sensor"

urlpatterns = [
    path("", views.SensorView.as_view()),
]