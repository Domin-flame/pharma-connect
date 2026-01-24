from rest_framework import viewsets, permissions
from .models import Order, OrderItem
from .serializers import OrderSerializer

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return Order.objects.all()
        if user.role == 'PHARMACY':
            return Order.objects.filter(pharmacy__user=user)
        return Order.objects.filter(user=user)

    def perform_create(self, serializer):
        # Initial logic for order creation (can be expanded with item handling)
        serializer.save(user=self.request.user)
