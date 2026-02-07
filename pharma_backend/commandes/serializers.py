from rest_framework import serializers
from .models import Order, OrderItem
from produits.models import Product


class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity"]


class OrderSerializer(serializers.ModelSerializer): #pattern repository3
    items = OrderItemSerializer(many=True) 

    class Meta:
        model = Order
        fields = ["id", "pharmacy", "status", "user", "total_amount", "created_at", "items"]
        read_only_fields = ["id", "created_at", "pharmacy"]

    def create(self, validated_data):
        items_data = validated_data.pop("items", [])
        request = self.context.get("request")
        user = getattr(request, "user", None)

        # Ensure only pharmacy accounts can create commands
        if not user or getattr(user, "role", None) != "PHARMACY" or not hasattr(user, "pharmacy"):
            raise serializers.ValidationError("Only pharmacy users with a linked pharmacy can create commands.")

        command = Command.objects.create(pharmacy=user.pharmacy, **validated_data)
        for item in items_data:
            CommandItem.objects.create(command=command, **item)
        return command

    def update(self, instance, validated_data):
        # Support updating basic fields and replacing items if provided
        items_data = validated_data.pop("items", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if items_data is not None:
            instance.items.all().delete()
            for item in items_data:
                CommandItem.objects.create(command=instance, **item)
        return instance
