import type { Pharmacy } from "../types/pharmacy";

export const mockPharmacies: Pharmacy[] = [
    {
        id: 1,
        name: 'Pharmacie du palais',
        address: 'Avenue du palais',
        distance: 0.5,
        hours: '8h-20h',
        rating: 4.8,
        isOpen: true,
        medicationName: 'Doliprane 1000mg',
        stock: 15,
        phone: '+237 6 XX XX XX XX',
        lat: 4.0511,
        lng: 9.7679
    },
    {
         id: 2,
        name: 'Pharmacie du soleil',
        address: 'Place de l independance',
        distance: 1.2,
        hours: '8h-20h',
        rating: 4.6,
        isOpen: true,
        medicationName: 'Doliprane 1000mg',
        stock: 8,
        phone: '+237 6 XX XX XX XX',
        lat: 4.0511,
        lng: 9.7679
    },

] 