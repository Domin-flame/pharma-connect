# PharmaConnect Frontend

Ce dossier contient le frontend moderne de PharmaConnect, construit avec React, Vite et TypeScript.

## Design
Le design est basé sur une esthétique premium avec :
- **Glassmorphism** : Effets de transparence et de flou d'arrière-plan.
- **Micro-animations** : Transitions fluides avec Framer Motion.
- **Réactivité** : Layout totalement responsive.
- **Typographie** : Utilisation de la police 'Outfit'.

## Installation

1. Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé.
2. Ouvrez un terminal dans ce dossier (`frontend`).
3. Installez les dépendances :
   ```bash
   npm install
   ```

## Développement

Pour lancer le serveur de développement :
```bash
npm run dev
```

Le frontend sera disponible sur `http://localhost:5173`. Il est configuré pour communiquer avec le backend Django sur `http://localhost:8000`.

## Fonctionnalités incluses

- **Accueil** : Landing page moderne avec recherche.
- **Authentification** : Connexion et Inscription.
- **Recherche** : Filtrage par pharmacies et par produits.
- **Profil Pharmacie** : Détails, contact et inventaire.
- **Commandes** : Historique des commandes utilisateur.
