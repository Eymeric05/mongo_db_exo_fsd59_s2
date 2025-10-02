# Stockhub

Application de gestion de produits avec authentification et base de données MongoDB.

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Démarrer MongoDB :
```bash
npm run mongo
```

3. Initialiser la base de données :
```bash
node seed.js
```

4. Démarrer l'application :
```bash
npm start
```

## Utilisation

L'application sera accessible sur http://localhost:3000

### Identifiants de connexion
- Login: Alan
- Mot de passe: 4l4n

## Fonctionnalités

- **Page d'accueil** (`/`) : Liste tous les produits avec le nombre total
- **Détail produit** (`/detail/:id`) : Affiche les détails d'un produit
- **Ajout produit** (`/add`) : Ajouter un nouveau produit (connexion requise)
- **Modification** (`/modify/:id`) : Modifier un produit (connexion requise)
- **Suppression** : Supprimer un produit (connexion requise)
- **Connexion** (`/login`) : Se connecter
- **Déconnexion** (`/logout`) : Se déconnecter

## Structure

- `server.js` : Serveur Express principal
- `db/` : Modèles MongoDB (Product, User)
- `controller/` : Contrôleurs pour les produits et utilisateurs
- `middleware/` : Middleware d'authentification
- `views/` : Templates Pug
- `public/css/` : Styles CSS
- `data/` : Données de test
