const { express, Products } = require('./products.js');
const { create } = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const PORT = process.env.port || 8080;

const app = express();
const httpServer = new HttpServer(app);
const socketIO = new IOServer(httpServer);

const productContainer = new Products('Products');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const hbs = create({});

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.set('views', './views');

app.get('/', (request, response) => {
	response.render('view/home');
});
app.get('/productos', (req, res) =>
	res.send(productContainer.getAllProducts())
);
app.post('/productos', (request, response) => {
	const product = request.body;
	productContainer.createProduct(product);
	response.redirect('/');
});

// socket
let messages = [];
socketIO.on('connection', (socket) => {
	socketIO.sockets.emit('sendProducts', {
		userID: socket.id,
		products: productContainer.getAllProducts(),
	});
	socket.on('updateView', (message) => {
		const product = Object.fromEntries(message);
		productContainer.createProduct(product);
		socketIO.sockets.emit('sendProducts', {
			userID: socket.id,
			products: productContainer.getAllProducts(),
		});
	});
	socketIO.sockets.emit('chat', messages);
	socket.on('message', (message) => {
		messages.push(message);
		socketIO.sockets.emit('chat', messages);
	});
});

httpServer.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
