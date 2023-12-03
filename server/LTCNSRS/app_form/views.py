import os
import subprocess
import tempfile
import shutil 
from rest_framework import generics, authentication, permissions
from .models import PrimaryChild, ChildHealthInfo, DuplicateChild
from .serializers import PrimaryChildSerializer, ChildHealthInfoSerializer, DuplicateChildSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.core import serializers
from .models import PrimaryChild, ChildHealthInfo, DuplicateChild
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from collections import Counter

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
    tables = request.GET.get('tables')  # Retrieve comma-separated tables from the request
    if not tables:
        return HttpResponse("No tables specified for backup", status=400)

    # Split the received comma-separated string into individual table names
    tables_list = tables.split(',')

    if not tables_list:
        return HttpResponse("No valid tables specified for backup", status=400)

    try:
        # Set the PGPASSWORD environment variable with your database password
        os.environ["PGPASSWORD"] = "group1"

        # Create a unique temporary file
        temp_file = tempfile.NamedTemporaryFile(suffix='.sql', delete=False).name

        # Command to perform the backup for specific tables and write to the temporary file
        command = f'pg_dump -U postgres -d db_cnsrs -t {" -t ".join(tables_list)} > {temp_file}'

        # Execute the command using shell=True to capture output and write to the temporary file
        subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE, env=os.environ)
        
        # Define the absolute path for the backup file
        backup_file_path = 'E:/Backup-Folder/backup-child.sql'  # Update this path

        # Move the temporary file to the defined backup file path
        shutil.move(temp_file, backup_file_path)

        with open(backup_file_path, 'rb') as backup_file:
            response = HttpResponse(backup_file.read())
            response['Content-Disposition'] = f'attachment; filename="{os.path.basename(backup_file_path)}"'
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
            
            # Create a temporary file to save the uploaded SQL file
            temp_file = tempfile.NamedTemporaryFile(suffix='.sql', delete=False)
            with uploaded_file.open() as sql_file:
                # Write the contents of the uploaded file to the temporary file
                for chunk in sql_file.chunks():
                    temp_file.write(chunk)
            
            # Close the temporary file after writing
            temp_file.close()

            # Execute the queries from the uploaded SQL file
            with open(temp_file.name, 'r') as sql_file:
                queries = sql_file.read().split(';')
                with connection.cursor() as cursor:
                    for query in queries:
                        query = query.strip()
                        if query:
                            cursor.execute(query)
            
            # Remove the temporary file
            os.remove(temp_file.name)

            return JsonResponse({'message': 'Database restored successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    
from collections import defaultdict



def get_most_frequent_statuses_view(request):
    all_health_info = ChildHealthInfo.objects.all()

    # Dictionary to store most frequent statuses by year and child
    frequent_statuses = defaultdict(lambda: defaultdict(dict))

    # Group statuses by year and child
    for info in all_health_info:
        child_id = info.child_id
        year = info.year

        if year not in frequent_statuses[child_id]:
            frequent_statuses[child_id][year] = {
                'weight_for_age': [],
                'length_for_age': [],
                'weight_for_length': [],
            }

        frequent_statuses[child_id][year]['weight_for_age'].append(info.weightForAge)
        frequent_statuses[child_id][year]['length_for_age'].append(info.lengthForAge)
        frequent_statuses[child_id][year]['weight_for_length'].append(info.weightForLength)

    # Find the most frequent status for each child for each year
    for child_id, years in frequent_statuses.items():
        for year, statuses in years.items():
            frequent_statuses[child_id][year] = {
                'weight_for_age': Counter(statuses['weight_for_age']).most_common(1)[0][0] if statuses['weight_for_age'] else None,
                'length_for_age': Counter(statuses['length_for_age']).most_common(1)[0][0] if statuses['length_for_age'] else None,
                'weight_for_length': Counter(statuses['weight_for_length']).most_common(1)[0][0] if statuses['weight_for_length'] else None
            }

    # Convert PrimaryChild objects to their IDs for serialization
    serializable_statuses = {
        str(child_id): years_data
        for child_id, years_data in frequent_statuses.items()
    }

    return JsonResponse(serializable_statuses)