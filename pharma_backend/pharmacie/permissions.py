from rest_framework import permissions

class IsPharmacyOwnerOrAdmin(permissions.BasePermission):
    """
    Seul le propriétaire ou l'admin peut modifier la pharmacie.
    Tout le monde (authentifié) peut voir si c'est approuvé.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'ADMIN':
            return True
        # Allow read-only for anyone if approved
        if request.method in permissions.SAFE_METHODS and obj.status == 'APPROVED' and obj.is_active:
            return True
        return obj.user == request.user