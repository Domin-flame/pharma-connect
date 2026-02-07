# pharmacies/serializers.py
from rest_framework import serializers
from .models import Pharmacy

class PharmacySerializer(serializers.ModelSerializer):
    nom = serializers.CharField(source='name', read_only=True)
    adresse = serializers.CharField(source='address', read_only=True)
    telephone = serializers.CharField(source='phone', required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = Pharmacy
        fields = ['id', 'user', 'name', 'nom', 'address', 'adresse', 'city', 'phone', 'telephone', 'email', 'latitude', 'longitude', 'status', 'is_active']
        read_only_fields = ['user', 'status', 'is_active', 'id']
        
    def validate_email(self, value):
        """Allow blank email"""
        if value == '':
            return None
        return value
    
    def validate_phone(self, value):
        """Allow blank phone"""
        if value == '':
            return None
        return value