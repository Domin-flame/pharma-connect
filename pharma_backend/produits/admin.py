from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'pharmacy', 'category', 'stock', 'price', 'requires_prescription')
    list_filter = ('category', 'requires_prescription', 'pharmacy')
    search_fields = ('name', 'category')
