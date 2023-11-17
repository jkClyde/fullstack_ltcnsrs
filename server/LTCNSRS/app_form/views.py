from rest_framework import generics, authentication, permissions
from .models import PrimaryChild, ChildHealthInfo, DuplicateChild
from .serializers import PrimaryChildSerializer, ChildHealthInfoSerializer, DuplicateChildSerializer
from rest_framework.response import Response
from rest_framework import status


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

class DuplicateChildCreateView(generics.CreateAPIView):
    queryset = DuplicateChild.objects.all()
    serializer_class = DuplicateChildSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone

    def create(self, request, *args, **kwargs):
        # Override the create method to handle the creation of a new DuplicateChild
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Validate and save the data
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)



