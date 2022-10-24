const { productsRouterApi, express, Products } = require('./products');
const app = express();
const PORT = process.env.port || 8080;

const pathAbsolute = __dirname;

const productContainer = new Products('Products');

productsRouterApi.get('/', (request, response) => {
	response.send(productContainer.getAllProducts());
});

productsRouterApi.get('/:id', (request, response) => {
	const id = request.params.id;
	response.send(productContainer.getProductById(id));
});

productsRouterApi.post('/', (request, response) => {
	const product = request.body;
	const { title, price, thumbnail } = request.body;
	console.log(product);
	response.send(productContainer.createProduct({ title, price, thumbnail }));
});

productsRouterApi.put('/:id', (request, response) => {
	const id = request.params.id;
	const product = request.body;
	response.send(productContainer.updateProductById(id, product));
});

productsRouterApi.delete('/:id', (request, response) => {
	const id = request.params.id;
	response.send(productContainer.deleteProductById(id));
});

app.use(express.json());
app.use('/formulario', express.static(pathAbsolute + '/public/form.html'));

app.use('/api/productos', productsRouterApi);

app.listen(PORT, () => console.log('servidor desplegado'));
