# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('children/', views.ChildList.as_view(), name='child-list'),
    path('children/<int:pk>/', views.ChildDetail.as_view(), name='child-detail'),
]
