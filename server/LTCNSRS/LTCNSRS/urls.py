from django.urls import path, include, re_path
from django.contrib import admin

from django.views.generic import TemplateView
from app_accounts.views import UserActivationView

urlpatterns = [
    path('admin/', admin.site.urls),  # Add this line for the admin interface
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/users/activation/<str:uid>/<str:token>/',
         UserActivationView.as_view(), name='UserActivationView'),
    path('', include('app_form.urls')),
    path('', include('app_calendar.urls')),

]
