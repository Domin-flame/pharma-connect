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

# Création du router pour les ViewSets
router = DefaultRouter()
router.register(r'produits', ProductViewSet, basename='products')
router.register(r'pharmacie', PharmacyViewSet, basename='pharmacies')

urlpatterns = [
    # Admin Django
    path('admin/', admin.site.urls),

    # JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # API ViewSets
    path('api/', include(router.urls)),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)