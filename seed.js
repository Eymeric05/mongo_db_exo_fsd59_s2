import db from "./db/index.js";
import Product from "./db/product.model.js";
import User from "./db/user.model.js";
import bcrypt from "bcrypt";
import productData from "./data/product.js";

const seedDatabase = async () => {
	try {
		console.log("Début du seed de la base de données...");

		// Nettoyer les collections existantes
		await Product.deleteMany({});
		await User.deleteMany({});
		console.log("Collections nettoyées");

		// Ajouter les produits
		await Product.insertMany(productData);
		console.log(`${productData.length} produits ajoutés`);

		// Créer l'utilisateur de test
		const hashedPassword = await bcrypt.hash("4l4n", 10);
		const user = new User({
			login: "Alan",
			password: hashedPassword
		});
		await user.save();
		console.log("Utilisateur Alan créé avec le mot de passe '4l4n'");

		console.log("Seed terminé avec succès !");
		console.log("Vous pouvez maintenant vous connecter avec :");
		console.log("Login: Alan");
		console.log("Mot de passe: 4l4n");
		
		process.exit(0);
	} catch (error) {
		console.error("Erreur lors du seed:", error);
		process.exit(1);
	}
};

seedDatabase();
