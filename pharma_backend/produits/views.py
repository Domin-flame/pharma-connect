from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Product
from .serializers import ProductSerializer
from .permissions import IsPharmacyOwner

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsPharmacyOwner]

    def get_queryset(self):
        if self.request.user.role == 'ADMIN':
            return Product.objects.all()
        return Product.objects.filter(pharmacy__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(pharmacy=self.request.user.pharmacy)