from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .firstquarter_serializer import FirstQuarterSerializer
from .secondquarter_serializer import SecondQuarterSerializer
from .thirdquarter_serializer import ThirdQuarterSerializer
from .fourthquarter_serializer import FourthQuarterSerializer

from .models import firstQuarter, secondQuarter, thirdQuarter, fourthQuarter
from rest_framework import permissions


class FirstQuarterListView(APIView):
    permission_classes = [permissions.AllowAny]

    serializer_class = FirstQuarterSerializer

    def get(self, request):
        children = firstQuarter.objects.all()
        serializer = self.serializer_class(children, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            child = firstQuarter.objects.get(pk=pk)
            serializer = self.serializer_class(
                child, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except firstQuarter.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            child = firstQuarter.objects.get(pk=pk)
            child.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except firstQuarter.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class SecondQuarterListView(APIView):
    permission_classes = [permissions.AllowAny]

    serializer_class = SecondQuarterSerializer

    def get(self, request):
        children = secondQuarter.objects.all()
        serializer = self.serializer_class(children, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            child = secondQuarter.objects.get(pk=pk)
            serializer = self.serializer_class(
                child, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except secondQuarter.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            child = secondQuarter.objects.get(pk=pk)
            child.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except secondQuarter.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ThirdQuarterListView(APIView):
    permission_classes = [permissions.AllowAny]

    serializer_class = ThirdQuarterSerializer

    def get(self, request):
        children = thirdQuarter.objects.all()
        serializer = self.serializer_class(children, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            child = thirdQuarter.objects.get(pk=pk)
            serializer = self.serializer_class(
                child, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except thirdQuarter.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            child = thirdQuarter.objects.get(pk=pk)
            child.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except thirdQuarter.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class FourthQuarterListView(APIView):
    permission_classes = [permissions.AllowAny]

    serializer_class = FourthQuarterSerializer

    def get(self, request):
        children = fourthQuarter.objects.all()
        serializer = self.serializer_class(children, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            child = fourthQuarter.objects.get(pk=pk)
            serializer = self.serializer_class(
                child, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except fourthQuarter.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            child = fourthQuarter.objects.get(pk=pk)
            child.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except fourthQuarter.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
