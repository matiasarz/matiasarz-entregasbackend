const { express, Products } = require('../products.js');
const app = express();

const PORT = process.env.port || 8080;

const productContainer = new Products('Products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (request, response) => {
	response.render('index.pug');
});

app.get('/productos', (request, response) => {
	response.render('listProduct.pug', {
		products: productContainer.getAllProducts(),
	});
});
app.post('/', (request, response) => {
	const product = request.body;
	productContainer.createProduct(product);
	response.redirect('/');
});

app.listen(PORT, () => console.log('servidor desplegado'));
