import os
import django
import sys
import json

# Setup Django environment
sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pharma_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from pharmacie.models import Pharmacy
from produits.models import Product
from rest_framework.test import APIClient

User = get_user_model()

def reset_db():
    print("Resetting DB...")
    Product.objects.all().delete()
    Pharmacy.objects.all().delete()
    User.objects.all().delete()
    User.objects.create_superuser('admin', 'admin@example.com', 'adminpass', role='ADMIN')

def test_flow():
    reset_db()
    client = APIClient()

    print("\n1. Register Pharmacist")
    resp = client.post('/api/users/register/', {
        'username': 'pharmacist1',
        'email': 'pharma1@test.com', 
        'password': 'password123',
        'role': 'PHARMACY'
    })
    print(f"Register Pharmacist: {resp.status_code}")
    assert resp.status_code == 201

    print("\n2. Login Pharmacist")
    resp = client.post('/api/token/', {
        'username': 'pharmacist1',
        'password': 'password123'
    })
    token = resp.data['access']
    print(f"Login Pharmacist: {resp.status_code}")

    print("\n3. Create Pharmacy (Pending)")
    client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
    resp = client.post('/api/pharmacie/', {
        'name': 'Pharma Life',
        'address': '123 Main St',
        'city': 'Test City',
        'phone': '555-0102',
        'email': 'contact@pharmalife.com',
        'latitude': 10.0,
        'longitude': 20.0
    })
    print(f"Create Pharmacy: {resp.status_code}")
    if resp.status_code != 201:
        print(f"Error Body: {resp.content}")
    print(f"Pharmacy Status: {resp.data.get('status')}")
    assert resp.data.get('status') == 'PENDING'
    pharmacy_id = resp.data['id']

    print("\n4. Create Product")
    resp = client.post('/api/produits/', {
        'name': 'Aspirin',
        'stock': 100,
        'category': 'Painkiller'
    })
    print(f"Create Product: {resp.status_code}")
    if resp.status_code != 201:
        print(f"Error Body: {resp.content}")
    assert resp.status_code == 201

    print("\n5. Register Client")
    client.credentials() # Logout
    resp = client.post('/api/users/register/', {
        'username': 'client1',
        'email': 'client1@test.com', 
        'password': 'password123',
        'role': 'CLIENT'
    })
    print(f"Register Client: {resp.status_code}")
    
    print("\n6. Login Client")
    resp = client.post('/api/token/', {
        'username': 'client1',
        'password': 'password123'
    })
    client_token = resp.data['access']
    client.credentials(HTTP_AUTHORIZATION='Bearer ' + client_token)

    print("\n7. Client Try View Pharmacies (Should be empty as Pending)")
    resp = client.get('/api/pharmacie/')
    print(f"Client List Pharmacies Count: {len(resp.data)}")
    assert len(resp.data) == 0

    print("\n8. Client Try View Products (Should be empty as Pharmacy Pending)")
    resp = client.get('/api/produits/')
    print(f"Client List Products Count: {len(resp.data)}")
    assert len(resp.data) == 0

    print("\n9. Admin Approve Pharmacy")
    client.credentials() # Logout
    # Login as Admin (assuming we have one or create one)
    admin = User.objects.get(username='admin')
    client.force_authenticate(user=admin)
    
    resp = client.post(f'/api/pharmacie/{pharmacy_id}/approve/')
    print(f"Admin Approve: {resp.status_code}")
    assert resp.status_code == 200

    print("\n10. Client View Again")
    client.force_authenticate(user=None)
    client.credentials(HTTP_AUTHORIZATION='Bearer ' + client_token)
    
    resp = client.get('/api/pharmacie/')
    print(f"Client List Pharmacies Count: {len(resp.data)}")
    assert len(resp.data) == 1
    print(f"Pharmacy Contact: {resp.data[0]['phone']}")

    resp = client.get('/api/produits/')
    print(f"Client List Products Count: {len(resp.data)}")
    assert len(resp.data) == 1
    
    print("\nSUCCESS: All steps passed.")

if __name__ == "__main__":
    try:
        test_flow()
    except Exception as e:
        print(f"FAILED: {e}")
