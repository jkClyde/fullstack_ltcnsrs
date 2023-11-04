from rest_framework import generics, authentication, permissions
from .models import PrimaryChild, ChildHealthInfo
from .serializers import PrimaryChildSerializer, ChildHealthInfoSerializer

class PrimaryChildListView(generics.ListCreateAPIView):
    queryset = PrimaryChild.objects.all()
    serializer_class = PrimaryChildSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone

class PrimaryChildDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PrimaryChild.objects.all()
    serializer_class = PrimaryChildSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone

class ChildHealthInfoListView(generics.ListCreateAPIView):
    queryset = ChildHealthInfo.objects.all()
    serializer_class = ChildHealthInfoSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone

class ChildHealthInfoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChildHealthInfo.objects.all()
    serializer_class = ChildHealthInfoSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone
