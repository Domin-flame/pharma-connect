from rest_framework import permissions

class IsPharmacyOwner(permissions.BasePermission):
    """
    Vérifie que l'utilisateur connecté est le propriétaire de l'objet
    """
    def has_object_permission(self, request, view, obj):
        # Les admins peuvent tout
        if request.user.role == 'ADMIN':
            return True
        # Read only for everyone
        if request.method in permissions.SAFE_METHODS:
            return True
        # Les pharmacies ne peuvent gérer que leurs produits
        return obj.pharmacy.user == request.user