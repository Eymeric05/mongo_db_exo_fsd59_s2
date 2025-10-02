import Product from "../db/product.model.js";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		const totalProducts = await Product.countDocuments();
		res.render('products', { 
			products, 
			totalProducts,
			user: req.session.userId ? true : false
		});
	} catch (error) {
		console.error('Erreur lors de la récupération des produits:', error);
		res.status(500).send('Erreur serveur');
	}
};

export const getProductDetail = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).send('Produit non trouvé');
		}
		res.render('product-detail', { 
			product,
			user: req.session.userId ? true : false
		});
	} catch (error) {
		console.error('Erreur lors de la récupération du produit:', error);
		res.status(500).send('Erreur serveur');
	}
};

export const getModifyProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).send('Produit non trouvé');
		}
		res.render('modify-product', { product });
	} catch (error) {
		console.error('Erreur lors de la récupération du produit:', error);
		res.status(500).send('Erreur serveur');
	}
};

export const updateProduct = async (req, res) => {
	try {
		const { sale, price, society, qty, size_h, size_w, size_uom, year } = req.body;
		
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				sale: sale === 'on',
				price: parseFloat(price),
				society,
				qty: parseInt(qty),
				size: {
					h: parseFloat(size_h),
					w: parseFloat(size_w),
					uom: size_uom
				},
				year: parseInt(year)
			},
			{ new: true }
		);

		if (!updatedProduct) {
			return res.status(404).send('Produit non trouvé');
		}

		res.redirect(`/detail/${req.params.id}`);
	} catch (error) {
		console.error('Erreur lors de la mise à jour du produit:', error);
		res.status(500).send('Erreur serveur');
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const deletedProduct = await Product.findByIdAndDelete(req.params.id);
		if (!deletedProduct) {
			return res.status(404).send('Produit non trouvé');
		}
		res.redirect('/');
	} catch (error) {
		console.error('Erreur lors de la suppression du produit:', error);
		res.status(500).send('Erreur serveur');
	}
};

export const getAddProduct = (req, res) => {
	res.render('add-product');
};

export const addProduct = async (req, res) => {
	try {
		const { sale, price, society, qty, size_h, size_w, size_uom, year } = req.body;
		
		const newProduct = new Product({
			sale: sale === 'on',
			price: parseFloat(price),
			society,
			qty: parseInt(qty),
			size: {
				h: parseFloat(size_h),
				w: parseFloat(size_w),
				uom: size_uom
			},
			year: parseInt(year)
		});

		await newProduct.save();
		res.redirect('/');
	} catch (error) {
		console.error('Erreur lors de l\'ajout du produit:', error);
		res.status(500).send('Erreur serveur');
	}
};
