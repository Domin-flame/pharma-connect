import React from 'react';
import GoogleMapView from './components/map/GoogleMapView';

export default function TestMap() {
    const pharmacies = [
        {
            id: 1,
            name: 'Pharmacie centrale',
            lat: 3.85,
            lng: 11.51,
            address: '123 Main Street',
            distance: 0.5,
            hours: '9:00 AM - 9:00 PM',
            rating: 4.5,
            phone: '+237 123 456 789',
            website: 'https://example.com',
            services: ['Vaccination', 'Prescription'],
        },
    ];

    return (
        <div style={{ width: '100%', height: 600 }}>
            <GoogleMapView pharmacies={pharmacies} />
        </div>
    );
}