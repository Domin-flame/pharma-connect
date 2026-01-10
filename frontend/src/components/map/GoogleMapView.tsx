import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import type { Pharmacy } from "../../types/pharmacy";

const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 3.8480,
  lng: 11.5021, // Yaoundé
};

interface GoogleMapViewProps {
  pharmacies: Pharmacy[];
  selectedPharmacyId?: number;
  onSelectPharmacy?: (pharmacy: Pharmacy) => void;
}

export default function GoogleMapView({
  pharmacies,
  selectedPharmacyId,
  onSelectPharmacy,
}: GoogleMapViewProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error('VITE_GOOGLE_MAPS_API_KEY is not set. Add it to your .env file.');
    return <p className="text-red-500">Clé Google Maps manquante (VITE_GOOGLE_MAPS_API_KEY).</p>;
  }

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  if (loadError) {
    console.error('Google Maps loadError:', loadError);
    return <p className="text-red-500">Erreur de chargement de la carte</p>;
  }

  if (!isLoaded) {
    return <p>Chargement de la carte...</p>;
  }

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
      {pharmacies.map((p) => (
        <Marker
          key={p.id}
          position={{ lat: p.lat, lng: p.lng }}
          onClick={() => onSelectPharmacy?.(p)}
          icon={p.id === selectedPharmacyId ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png" : undefined}
        />
      ))}
    </GoogleMap>
  );
}