from rest_framework import serializers
from .models import Child, QuarterData


class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = '__all__'


class QuarterDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuarterData
        fields = '__all__'
