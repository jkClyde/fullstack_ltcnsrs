from rest_framework import serializers
from .models import Forms

class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forms
        fields = ('id', 'firstName', 'middleName', 'lastName', 'address', 
                  'pt', 'gender', 'birthdate', 'aim','bpe', 'disability',                  
                  'parent_name', 'parent_occupation', 'relationship','parent_ethnicity',
                  'dow','weight', 'height', 'muac', 'purga', 'vac',
                  'barangay' , 'sitio')

                 