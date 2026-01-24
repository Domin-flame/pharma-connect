from django.contrib import admin
from .models import Pharmacy

@admin.register(Pharmacy)
class PharmacyAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'phone', 'status', 'is_active')
    list_filter = ('status', 'is_active', 'city')
    search_fields = ('name', 'address', 'city')
