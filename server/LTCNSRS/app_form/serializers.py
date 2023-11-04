from rest_framework import serializers
from .models import PrimaryChild, firstQuarter, secondQuarter, thirdQuarter, fourthQuarter

class PrimaryChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrimaryChild
        fields = '__all__'

class firstQuarterInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = firstQuarter
        fields = '__all__'
class secondQuarterSerializer(serializers.ModelSerializer):
    class Meta:
        model = secondQuarter
        fields = '__all__'

class thirdQuarterSerializer(serializers.ModelSerializer):
    class Meta:
        model = thirdQuarter
        fields = '__all__'

class fourthQuarterSerializer(serializers.ModelSerializer):
    class Meta:
        model = fourthQuarter
        fields = '__all__'