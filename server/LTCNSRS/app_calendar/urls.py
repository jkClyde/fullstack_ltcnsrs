from django.urls import path, include
from .views import CalendarView , EventDeleteView 
from rest_framework.routers import DefaultRouter

# Create a router for the CalendarEventViewSet

urlpatterns = [
    path('calendar/', CalendarView.as_view(),  name='event-list'), 
    path('events/<int:pk>/', EventDeleteView.as_view(), name='event-delete'),

]
    