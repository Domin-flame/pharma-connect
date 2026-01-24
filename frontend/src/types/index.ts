export interface User {
    id: number;
    username: string;
    email: string;
}

export interface Pharmacy {
    id: number;
    nom: string;
    adresse: string;
    description?: string;
    latitude?: number;
    longitude?: number;
    telephone?: string;
    horaires?: string;
}

export interface Product {
    id: number;
    nom: string;
    description: string;
    prix: number;
    categorie: string;
    stock: number;
    pharmacie: number;
    pharmacie_name: string;
    image?: string;
}

export interface Order {
    id: string;
    pharmacy: string;
    date: string;
    total: string;
    status: 'Livré' | 'En préparation' | 'Annulé' | 'Confirmé';
}

export interface AuthResponse {
    access: string;
    refresh: string;
}
