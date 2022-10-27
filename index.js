const { express, Products } = require('./products');
const { create } = require('express-handlebars');
const app = express();
const PORT = process.env.port || 8080;

const productContainer = new Products('Products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = create({});

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.set('views', './views');

app.get('/', (request, response) => {
	response.render('view/form');
});

app.get('/productos', (request, response) => {
	response.render('view/product', {
		products: productContainer.getAllProducts(),
	});
});
app.post('/', (request, response) => {
	const product = request.body;
	productContainer.createProduct(product);
	response.redirect('/');
});

app.listen(PORT, () => console.log('servidor desplegado'));
