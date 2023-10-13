from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import FormSerializer
from .models import Forms

class FormsListView(APIView):
    serializer_class = FormSerializer

    def get(self, request):
        forms = Forms.objects.all()
        serializer = self.serializer_class(forms, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #for editing
    def put(self, request, pk):
        try:
            form = Forms.objects.get(pk=pk)
            serializer = self.serializer_class(form, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Forms.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            form = Forms.objects.get(pk=pk)
            form.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Forms.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
