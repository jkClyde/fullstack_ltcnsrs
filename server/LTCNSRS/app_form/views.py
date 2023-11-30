from rest_framework import generics, authentication, permissions
from .models import PrimaryChild, ChildHealthInfo, DuplicateChild
from .serializers import PrimaryChildSerializer, ChildHealthInfoSerializer, DuplicateChildSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.core import serializers
from .models import PrimaryChild, ChildHealthInfo, DuplicateChild
import subprocess
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import os



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

class DuplicateChildCreateView(generics.ListCreateAPIView):
    serializer_class = DuplicateChildSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone

    def get_queryset(self):
        # Filter queryset based on isDuplicate value
        return DuplicateChild.objects.filter(isDuplicate=False)

    def create(self, request, *args, **kwargs):
        # Override the create method to handle the creation of a new DuplicateChild
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Validate and save the data
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class DuplicateChildDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DuplicateChild.objects.all()
    serializer_class = DuplicateChildSerializer
    authentication_classes = []  # No authentication required
    permission_classes = [permissions.AllowAny]  # Allow access to everyone

def backup_database(request):
    tables = request.GET.getlist('tables')  # Retrieve a list of tables from the request
    if not tables:
        return HttpResponse("No tables specified for backup", status=400)

 # Inside the backup function
    temp_file = 'temp_backup.sql'  # Temporary file name

    try:
        # Command to perform the backup for specific tables and write to the temporary file
        command = f'pg_dump -U postgres -d db_cnsrs -t {" -t ".join(tables)} > {temp_file}'

        # Execute the command using shell=True to capture output and write to the temporary file
        subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE)
        
        # Rename the temporary file to backup-child.sql
        os.rename(temp_file, 'backup-child.sql')

        with open('backup-child.sql', 'rb') as backup_file:
            response = HttpResponse(backup_file.read())
            response['Content-Disposition'] = 'attachment; filename="backup-child.sql"'
            return response
    except subprocess.CalledProcessError as e:
        print(f"Backup failed: {e}")
        return HttpResponse("Backup failed", status=500)
    except Exception as ex:
        print(f"An error occurred: {ex}")
        return HttpResponse("Internal Server Error", status=500)

    
# Restore function
@csrf_exempt
def restore_database(request):
    if request.method == 'POST':
        try:
            uploaded_file = request.FILES['backup_file']
            if not uploaded_file.name.endswith('.sql'):
                return JsonResponse({'error': 'Invalid file format. Must be a .sql file'}, status=400)
            
            # Read the uploaded SQL file and execute the queries
            with uploaded_file.open() as sql_file:
                queries = sql_file.read().decode('utf-8').split(';')
                with connection.cursor() as cursor:
                    for query in queries:
                        query = query.strip()
                        if query:
                            cursor.execute(query)
            
            return JsonResponse({'message': 'Database restored successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)