import User from "../db/user.model.js";
import bcrypt from "bcrypt";

export const getLogin = (req, res) => {
	res.render('login');
};

export const postLogin = async (req, res) => {
	try {
		const { login, password } = req.body;
		
		const user = await User.findOne({ login });
		if (!user) {
			return res.render('login', { error: 'Identifiants incorrects' });
		}

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return res.render('login', { error: 'Identifiants incorrects' });
		}

		req.session.userId = user._id;
		res.redirect('/');
	} catch (error) {
		console.error('Erreur lors de la connexion:', error);
		res.status(500).send('Erreur serveur');
	}
};

export const logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.error('Erreur lors de la déconnexion:', err);
		}
		res.redirect('/');
	});
};
