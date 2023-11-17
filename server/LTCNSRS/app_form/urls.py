from django.urls import path
from .views import PrimaryChildListView, PrimaryChildDetailView, ChildHealthInfoListView, ChildHealthInfoDetailView, DuplicateChildCreateView
urlpatterns = [
    path('primarychild/', PrimaryChildListView.as_view(), name='primarychild-list'),
    path('primarychild/<int:pk>/', PrimaryChildDetailView.as_view(), name='primarychild-detail'),
    path('duplicateChild/', DuplicateChildCreateView.as_view(), name='duplicate-list'),

    # URLs for the firstQuarter model
    path('childhealthinfo/', ChildHealthInfoListView.as_view(), name='ChildHealthInfo-list'),
    path('childhealthinfo/<int:pk>/', ChildHealthInfoDetailView.as_view(), name='ChildHealthInfo-detail'),


]