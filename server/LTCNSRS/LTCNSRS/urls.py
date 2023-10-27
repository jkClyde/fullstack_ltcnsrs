from django.urls import path, include, re_path
from django.contrib import admin

from django.views.generic import TemplateView
from app_accounts.views import UserActivationView
from app_accounts.views import UserListView, UserApprovalView, DisableUserView, EnableUserView

urlpatterns = [
    path('admin/', admin.site.urls),  # Add this line for the admin interface
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/users/activation/<str:uid>/<str:token>/',
         UserActivationView.as_view(), name='UserActivationView'),
    path('', include('app_form.urls')),
    path('', include('app_calendar.urls')),
    path('user_approval/<int:user_id>/<str:action>/', UserApprovalView.as_view(), name='user_approval'),
    path('users/<int:pk>/disable/', DisableUserView.as_view(), name='disable_user'),
    path('users/<int:pk>/enable/', EnableUserView.as_view(), name='enable_user'),



    # Include URL patterns for each quarter
    # Replace 'app_form.urls' with the actual URL patterns for the first quarter
    path('firstquarter/', include('app_form.urls')),
    # Replace 'app_form.urls' with the actual URL patterns for the second quarter
    path('secondquarter/', include('app_form.urls')),
    # Replace 'app_form.urls' with the actual URL patterns for the third quarter
    path('thirdquarter/', include('app_form.urls')),
    # Replace 'app_form.urls' with the actual URL patterns for the fourth quarter
    path('fourthquarter/', include('app_form.urls')),

    path('api/users/', UserListView.as_view(), name='user-list'),

]
