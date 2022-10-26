const { express, Products } = require('../products.js');
const app = express();

const PORT = process.env.port || 8080;

const productContainer = new Products('Products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
	response.render('index.ejs');
});

app.get('/productos', (request, response) => {
	response.render('view/listProduct.ejs', {
		products: productContainer.getAllProducts(),
	});
});
app.post('/', (request, response) => {
	const product = request.body;
	productContainer.createProduct(product);
	response.redirect('/');
});

app.listen(PORT, () => console.log('servidor desplegado'));
