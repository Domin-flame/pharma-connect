from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Pharmacy
from .serializers import PharmacySerializer
from .permissions import IsPharmacyOwnerOrAdmin

class PharmacyViewSet(viewsets.ModelViewSet):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmacySerializer
    permission_classes = [IsAuthenticated, IsPharmacyOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        queryset = Pharmacy.objects.all()
        
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)

        if user.is_anonymous:
            return queryset.filter(status='APPROVED', is_active=True)
            
        if user.role == 'ADMIN':
            return queryset
        # Clients can see all APPROVED and active pharmacies
        if user.role == 'CLIENT':
            return queryset.filter(status='APPROVED', is_active=True)
        # Pharmacists see their own
        return queryset.filter(user=user)

    def perform_create(self, serializer):
        # When user creates, it defaults to PENDING (model default)
        # User is assigned automatically.
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def approve(self, request, pk=None):
        if request.user.role != 'ADMIN':
            return Response({'error': 'Only admins can approve.'}, status=status.HTTP_403_FORBIDDEN)
        
        pharmacy = self.get_object()
        pharmacy.status = 'APPROVED'
        pharmacy.is_active = True
        pharmacy.save()
        return Response({'status': 'Pharmacy approved'})

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def reject(self, request, pk=None):
        if request.user.role != 'ADMIN':
            return Response({'error': 'Only admins can approve/reject.'}, status=status.HTTP_403_FORBIDDEN)
        
        pharmacy = self.get_object()
        pharmacy.status = 'REJECTED'
        pharmacy.is_active = False
        pharmacy.save()
        return Response({'status': 'Pharmacy rejected'})