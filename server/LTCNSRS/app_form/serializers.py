from rest_framework import serializers
from .models import Forms

class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forms
        fields = ('id', 'firstName', 'middleName', 'lastName', 'address', 
                  'temporary', 'gender', 'birthdate', 'bpe', 'disability',                  
                  'father_name', 'father_occupation', 'father_ethnicity',
                  'mother_name', 'mother_occupation', 'mother_ethnicity',
                  'dow','weight', 'height', 'midUpperArmCircumference', 'purga', 'vac')

                 