from rest_framework import generics, authentication, permissions
from .models import PrimaryChild, firstQuarter, secondQuarter, thirdQuarter, fourthQuarter
from .serializers import PrimaryChildSerializer, firstQuarterInfoSerializer, secondQuarterSerializer, thirdQuarterSerializer, fourthQuarterSerializer

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

class firstQuarterListView(generics.ListCreateAPIView):
    queryset = firstQuarter.objects.all()
    serializer_class = firstQuarterInfoSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone

class firstQuarterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = firstQuarter.objects.all()
    serializer_class = firstQuarterInfoSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone

class secondQuarterListView(generics.ListCreateAPIView):
    queryset = secondQuarter.objects.all()
    serializer_class = secondQuarterSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone

class secondQuarterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = secondQuarter.objects.all()
    serializer_class = secondQuarterSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone

class thirdQuarterListView(generics.ListCreateAPIView):
    queryset = thirdQuarter.objects.all()
    serializer_class = thirdQuarterSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone

class thirdQuarterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = thirdQuarter.objects.all()
    serializer_class = thirdQuarterSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone

class fourthQuarterListView(generics.ListCreateAPIView):
    queryset = fourthQuarter.objects.all()
    serializer_class = fourthQuarterSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone

class FourthQuarterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = fourthQuarter.objects.all()
    serializer_class = fourthQuarterSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone