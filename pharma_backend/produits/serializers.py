# products/serializers.py
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    nom = serializers.CharField(source='name')
    prix = serializers.DecimalField(source='price', max_digits=10, decimal_places=2)
    categorie = serializers.CharField(source='category')
    pharmacie_name = serializers.CharField(source='pharmacy.name', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'pharmacy', 'pharmacie_name', 'name', 'nom', 'description', 'stock', 'category', 'categorie', 'price', 'prix', 'image', 'requires_prescription', 'created_at']
        read_only_fields = ['pharmacy']