from django.urls import path
from .views import PrimaryChildListView, PrimaryChildDetailView, firstQuarterListView, firstQuarterDetailView, secondQuarterListView, secondQuarterDetailView, thirdQuarterListView, thirdQuarterDetailView,fourthQuarterListView,FourthQuarterDetailView

urlpatterns = [
    path('primarychild/', PrimaryChildListView.as_view(), name='primarychild-list'),
    path('primarychild/<int:pk>/', PrimaryChildDetailView.as_view(), name='primarychild-detail'),

    # URLs for the firstQuarter model
    path('firstquarter/', firstQuarterListView.as_view(), name='firstquarter-list'),
    path('firstquarter/<int:pk>/', firstQuarterDetailView.as_view(), name='firstquarter-detail'),

    # URLs for the secondQuarter model
    path('secondquarter/', secondQuarterListView.as_view(), name='secondquarter-list'),
    path('secondquarter/<int:pk>/', secondQuarterDetailView.as_view(), name='secondquarter-detail'),

    # URLs for the thirdQuarter model
    path('thirdquarter/', thirdQuarterListView.as_view(), name='thirdquarter-list'),
    path('thirdquarter/<int:pk>/', thirdQuarterDetailView.as_view(), name='thirdquarter-detail'),

    # URLs for the fourthQuarter model
    path('fourthquarter/', fourthQuarterListView.as_view(), name='fourthquarter-list'),
    path('fourthquarter/<int:pk>/', FourthQuarterDetailView.as_view(), name='fourthquarter-detail'),
]