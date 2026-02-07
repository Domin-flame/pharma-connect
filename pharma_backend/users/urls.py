from django.urls import path
from .views import CurrentUserView, RegisterView

urlpatterns = [
    path('me/', CurrentUserView.as_view(), name='user-detail'),
    path('register/', RegisterView.as_view(), name='register'),
]
