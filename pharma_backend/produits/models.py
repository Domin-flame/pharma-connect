from django.db import models
from pharmacies.models import Pharmacy

class Product(models.Model):
    pharmacy = models.ForeignKey(
        Pharmacy,
        related_name='products',
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    stock = models.IntegerField()
    category = models.CharField(max_length=100)
    requires_prescription = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name