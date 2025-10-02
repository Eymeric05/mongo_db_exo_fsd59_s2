import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db/index.js";

// Import des contrôleurs pour la gestion des produits et utilisateurs
import * as productController from "./controller/product.controller.js";
import * as userController from "./controller/user.controller.js";

// Middleware d'authentification pour protéger certaines routes
import { requireAuth, requireGuest } from "./middleware/auth.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration du moteur de template Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware de base pour le traitement des requêtes
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuration des sessions pour la gestion de l'authentification
app.use(session({
	secret: 'stockhub-secret-key-2024',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: false }
}));

// Routes publiques - accessibles sans authentification
app.get('/', productController.getProducts);
app.get('/detail/:id', productController.getProductDetail);

// Routes d'authentification - gestion des connexions
app.get('/login', requireGuest, userController.getLogin);
app.post('/login', requireGuest, userController.postLogin);
app.get('/logout', userController.logout);

// Routes protégées - nécessitent une authentification
app.get('/add', requireAuth, productController.getAddProduct);
app.post('/add', requireAuth, productController.addProduct);
app.get('/modify/:id', requireAuth, productController.getModifyProduct);
app.post('/modify/:id', requireAuth, productController.updateProduct);
app.post('/delete/:id', requireAuth, productController.deleteProduct);

// Démarrage du serveur StockHub
app.listen(PORT, () => {
	console.log(`🚀 StockHub démarré sur le port ${PORT}`);
	console.log(`📦 Gestion d'inventaire disponible sur http://localhost:${PORT}`);
});
