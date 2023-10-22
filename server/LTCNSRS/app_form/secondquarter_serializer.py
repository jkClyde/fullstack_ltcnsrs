from rest_framework import serializers
from .models import secondQuarter


class SecondQuarterSerializer(serializers.ModelSerializer):
    class Meta:
        model = secondQuarter
        fields = (
            'id', 'firstName', 'middleName', 'lastName', 'address',
            'pt', 'gender', 'birthdate', 'aim', 'bpe', 'disability',
            'parentName', 'occupation', 'relationship', 'ethnicity',
            'dow', 'weight', 'height', 'muac', 'purga', 'vac', 'barangay'
        )
