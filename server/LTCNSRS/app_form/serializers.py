from rest_framework import serializers
from .models import PrimaryChild, ChildHealthInfo

class PrimaryChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrimaryChild
        fields = '__all__'

class ChildHealthInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildHealthInfo
        fields = '__all__'
