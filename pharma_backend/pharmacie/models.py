from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

class Pharmacy(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name