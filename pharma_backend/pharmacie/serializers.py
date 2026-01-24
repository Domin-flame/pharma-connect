# pharmacies/serializers.py
from rest_framework import serializers
from .models import Pharmacy

class PharmacySerializer(serializers.ModelSerializer):
    nom = serializers.CharField(source='name')
    adresse = serializers.CharField(source='address')
    telephone = serializers.CharField(source='phone', required=False)

    class Meta:
        model = Pharmacy
        fields = ['id', 'user', 'name', 'nom', 'address', 'adresse', 'city', 'phone', 'telephone', 'email', 'latitude', 'longitude', 'status', 'is_active']
        read_only_fields = ['user', 'status', 'is_active']