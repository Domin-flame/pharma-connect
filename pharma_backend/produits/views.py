from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Product
from .serializers import ProductSerializer
from .permissions import IsPharmacyOwner

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsPharmacyOwner]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'ADMIN':
            return Product.objects.all()
        if user.role == 'CLIENT':
            return Product.objects.filter(pharmacy__status='APPROVED', pharmacy__is_active=True)
        return Product.objects.filter(pharmacy__user=user)

    def perform_create(self, serializer):
        serializer.save(pharmacy=self.request.user.pharmacy)