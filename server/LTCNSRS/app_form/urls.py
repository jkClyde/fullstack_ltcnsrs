from django.urls import path
from .views import FormsListView
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('forms/', FormsListView.as_view(), name='forms-list'),
    # Add other URL patterns as needed for your views
]
