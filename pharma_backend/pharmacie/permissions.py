from rest_framework.permissions import BasePermission

class IsPharmacyOwnerOrAdmin(BasePermission):
    """
    Seul le propriétaire ou l'admin peut modifier/voir la pharmacie
    """
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'ADMIN':
            return True
        return obj.user == request.user