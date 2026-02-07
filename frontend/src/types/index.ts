export interface User {
    id: number;
    username: string;
    email: string;
}

export interface Pharmacy {
    id: number;
    nom: string;
    name: string;
    adresse: string;
    address: string;
    city: string;
    description?: string;
    latitude?: number;
    longitude?: number;
    telephone?: string;
    phone?: string;
    email?: string;
    horaires?: string;
    status?: string;
    is_active?: boolean;
    user?: number;
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
