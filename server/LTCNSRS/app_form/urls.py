from django.urls import path
from .views import FirstQuarterListView, SecondQuarterListView, ThirdQuarterListView, FourthQuarterListView

urlpatterns = [
    path('firstquarter/', FirstQuarterListView.as_view(), name='firstquarter-list'),
    path('firstquarter/<int:pk>/', FirstQuarterListView.as_view(),
         name='firstquarter-detail'),

    path('secondquarter/', SecondQuarterListView.as_view(),
         name='secondquarter-list'),
    path('secondquarter/<int:pk>/', SecondQuarterListView.as_view(),
         name='secondquarter-detail'),

    path('thirdquarter/', ThirdQuarterListView.as_view(), name='thirdquarter-list'),
    path('thirdquarter/<int:pk>/', ThirdQuarterListView.as_view(),
         name='thirdquarter-detail'),

    path('fourthquarter/', FourthQuarterListView.as_view(),
         name='fourthquarter-list'),
    path('fourthquarter/<int:pk>/', FourthQuarterListView.as_view(),
         name='fourthquarter-detail'),
]
