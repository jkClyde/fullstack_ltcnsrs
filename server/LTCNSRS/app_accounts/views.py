from django.http import JsonResponse

from django.views import View
import requests
from rest_framework import permissions
from .serializers import UserCreateSerializer
from rest_framework import generics
from .models import UserAccount

from rest_framework.response import Response
from rest_framework import status



class UserActivationView(View):
    permission_classes = [permissions.AllowAny]  # Excludes authentication
    def get(self, request, uid, token):
        post_url = "http://localhost:8000/auth/users/activation/"
        post_data = {'uid': uid, 'token': token}

        try:
            result = requests.post(post_url, data=post_data)
            content = result.text
            return JsonResponse({"message": "Successfully Activated. You may now login at http://localhost:5173/login"})
        except Exception as e:
            return JsonResponse({"error": str(e)})
        

class UserListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]  # Excludes authentication
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializer


class UserApprovalView(View):
    def get(self, request, user_id, action):
        try:
            user = UserAccount.objects.get(id=user_id)
            if action == 'approve':
                user.is_approved = True
                user.save()
                return JsonResponse({"message": "User approved successfully"})
            elif action == 'deny':
                user.delete()
                return JsonResponse({"message": "User registration denied"})
            else:
                return JsonResponse({"error": "Invalid action"})
        except UserAccount.DoesNotExist:
            return JsonResponse({"error": "User not found"})
        

class DisableUserView(generics.UpdateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializer

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_disabled = True
        user.save()
        return Response(data={'message': 'User has been disabled'}, status=status.HTTP_200_OK)

class EnableUserView(generics.UpdateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializer

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_disabled = False
        user.disabled_at = None
        user.save()
        return Response(data={'message': 'User has been enabled'}, status=status.HTTP_200_OK)