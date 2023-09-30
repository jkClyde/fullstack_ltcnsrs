from django.shortcuts import render


from rest_framework.generics import DestroyAPIView
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import CalendarSerializer
from .models import CalendarEvent


# Create your views here.
class CalendarView(APIView):
    serializer_class = CalendarSerializer

    def get(self, request):
        output = [{"id": output.id,
                   "title": output.title,
                   "date": output.date.isoformat(),
                  } 
                  for output in CalendarEvent.objects.all()]
        return Response(output) 
    
    def post(self, request):
        serializer = CalendarSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)  
        
class EventDeleteView(DestroyAPIView):
    queryset = CalendarEvent.objects.all()  # Queryset to fetch the event to delete
    serializer_class = CalendarSerializer  # Serializer for event deletion
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

















# class CalendarView(generics.CreateAPIView):
#     queryset = CalendarEvent.objects.all()  # Use the 'objects' manager to retrieve all records
#     serializer_class = CalendarSerializer

# class CalendarEventViewSet(viewsets.ModelViewSet):
#     queryset = CalendarEvent.objects.all()  # Use the 'objects' manager to retrieve all records
#     serializer_class = CalendarSerializer

# def main(request):
#     return HttpResponse("Hello")