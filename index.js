const { productsRouterApi, express } = require('./products');
const app = express();
const PORT = process.env.port || 8080;

let productsContainer = [];

const pathAbsolute = __dirname;

app.use('/formulario', express.static(pathAbsolute + '/public/form.html'));

productsRouterApi.get('/', (request, response) => {
	response.send({ productsContainer });
});

productsRouterApi.get('/:id', (request, response) => {
	const params = request.params.id;
	const productSelected = productsContainer.filter(
		(product) => product.id == params
	);
	productSelected.length
		? response.send(productSelected)
		: response.send({ error: 'product not found' });
});

productsRouterApi.post('/', (request, response) => {
	const { product, title, price, thumbnail } = request.body;
	product.id = productsContainer.length + 1;
	productsContainer.push(product || { title, price, thumbnail });
	response.send({ product, title, price, thumbnail });
});

productsRouterApi.put('/:id', (request, response) => {
	const params = request.params.id;
	const update = request.body;

	productsContainer.forEach((item) => {
		if (item.id == params) {
			item = update;
		} else item;

		response.send(item);
	});
});

productsRouterApi.delete('/:id', (request, response) => {
	const params = request.params.id;
	const deleteProduct = productsContainer.filter(
		(product) => product.id != params
	);
	productsContainer = deleteProduct;
	response.send(productsContainer);
});

app.use(express.json());

app.use('/api/productos', productsRouterApi);

app.listen(PORT, () => console.log('servidor desplegado'));
