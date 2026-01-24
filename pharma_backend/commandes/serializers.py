from rest_framework import serializers
from .models import Order, OrderItem
from produits.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_details', 'quantity', 'price']
        read_only_fields = ['price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    pharmacy_name = serializers.CharField(source='pharmacy.name', read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'pharmacy', 'pharmacy_name', 'status', 'total_amount', 'created_at', 'items']
        read_only_fields = ['user', 'total_amount', 'status']
