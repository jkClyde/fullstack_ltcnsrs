from django.urls import path
from .views import FormsListView

urlpatterns = [
    path('forms/', FormsListView.as_view(), name='forms-list'),
    path('forms/<int:pk>/', FormsListView.as_view(), name='form-detail'),
]
