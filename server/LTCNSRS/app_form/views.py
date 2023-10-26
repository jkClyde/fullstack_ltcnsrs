from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Child
from .serializers import ChildSerializer
from rest_framework.response import Response
from rest_framework import status


class ChildList(generics.ListCreateAPIView):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print("Received a POST request to ChildList view.")
        print("Request data:")
        print(request.data)
        serializer = ChildSerializer(data=request.data)

        if serializer.is_valid():
            print("Serializer is valid.")
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer is not valid. Validation errors:")
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChildDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer
    permission_classes = [AllowAny]
