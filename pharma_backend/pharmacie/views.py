from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Pharmacy
from .serializers import PharmacySerializer
from .permissions import IsPharmacyOwnerOrAdmin

class PharmacyViewSet(viewsets.ModelViewSet):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmacySerializer
    permission_classes = [IsAuthenticated, IsPharmacyOwnerOrAdmin]

    def get_queryset(self):
        # Les pharmacies voient seulement leurs propres pharmacies
        if self.request.user.role == 'ADMIN':
            return Pharmacy.objects.all()
        return Pharmacy.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)