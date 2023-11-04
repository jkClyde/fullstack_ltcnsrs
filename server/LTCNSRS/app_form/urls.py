from django.urls import path
from .views import PrimaryChildListView, PrimaryChildDetailView, ChildHealthInfoListView, ChildHealthInfoDetailView

urlpatterns = [
    path('primarychild/', PrimaryChildListView.as_view(), name='primarychild-list'),
    path('primarychild/<int:pk>/', PrimaryChildDetailView.as_view(), name='primarychild-detail'),

    path('childhealthinfo/', ChildHealthInfoListView.as_view(), name='childhealthinfo-list'),
    path('childhealthinfo/<int:pk>/', ChildHealthInfoDetailView.as_view(), name='childhealthinfo-detail'),
]
