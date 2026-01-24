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
        queryset = Product.objects.all()
        
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)
            
        if user.is_anonymous:
            return queryset.filter(pharmacy__status='APPROVED', pharmacy__is_active=True)

        if user.role == 'ADMIN':
            return queryset
        if user.role == 'CLIENT':
            return queryset.filter(pharmacy__status='APPROVED', pharmacy__is_active=True)
        return queryset.filter(pharmacy__user=user)

    def perform_create(self, serializer):
        serializer.save(pharmacy=self.request.user.pharmacy)