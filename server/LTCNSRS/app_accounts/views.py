from django.http import JsonResponse

from django.views import View
import requests

class UserActivationView(View):
    def get(self, request, uid, token):
        post_url = "http://localhost:8000/auth/users/activation/"
        post_data = {'uid': uid, 'token': token}

        try:
            result = requests.post(post_url, data=post_data)
            content = result.text
            return JsonResponse({"message": "Successfully Activated. You may now login at http://localhost:5173/login"})
        except Exception as e:
            return JsonResponse({"error": str(e)})
