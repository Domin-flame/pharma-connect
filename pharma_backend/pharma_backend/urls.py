from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

# JWT views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Import des viewsets
from produits.views import ProductViewSet
from pharmacie.views import PharmacyViewSet
from commandes.views import OrderViewSet

# Création du router pour les ViewSets
router = DefaultRouter()
router.register(r'produits', ProductViewSet, basename='products')
router.register(r'pharmacie', PharmacyViewSet, basename='pharmacies')
router.register(r'commandes', OrderViewSet, basename='commandes')

urlpatterns = [
    # Admin Django
    path('admin/', admin.site.urls),

    # JWT
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),

    # API ViewSets
    path('api/', include(router.urls)),
    path('api/users/', include('users.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)