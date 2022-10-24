// EJEMPLO

// const express = require('express');
// const Router = express.Router;
// const app = express();

// const routerApi = Router();

// routerApi.get('/', (req, res) => {
// 	res.send('get ok');
// });
// routerApi.post('/', (req, res) => {
// 	res.send('post ok');
// });

// app.use('/api', routerApi);

// const routerUser = Router();

// routerUser.get('/login', (req, res) => {
// 	res.send('login ok');
// });
// routerUser.post('/logout', (req, res) => {
// 	res.send('logout ok');
// });

// app.use('/user', routerUser);

// app.listen(8080);

// EJEMPLO PETS AND PEOPLE
// const express = require('express');
// const routerPeople = require('./routes/personas.js');
// const routerPets = require('./routes/mascotas.js');

// const app = express();
// const PORT = process.env.PORT || 8080;
// const server = app.listen(PORT, () =>
// 	console.log(`server listening on port: ${PORT}`)
// );
// server.on('error', (e) => console.error(`Error: ${e}`));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/people', routerPeople);
// app.use('/pets', routerPets);

// const pathAbsolute = __dirname;

// app.use('/formulario', express.static(pathAbsolute + '/public/index.html'));
// app.use(express.static(pathAbsolute + '/public'));

// EJEMPLO PATH ABSOLUTO Y PREFIJO VIRTUAL
// const express = require('express');
// const app = express();
// // path absoluto, raiz
// const pathAbsolute = __dirname;
// // servicio de archivos estaticos img/css/js
// app.use(express.static(pathAbsolute+'/public'));
// app.listen(3000);

// // configurando un prefijo virtual
// // aca identifico el prefijo

// app.use('static', express.static(pathAbsolute+'/public'));
// app.listen(3000)

const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/subir', express.static(__dirname + '/public/files.html'));
app.use(express.static(__dirname + '/uploads'));

// EJEMPLO MIDDELWARE
// middleware que verifica si el usuario es un administrador

// function isAdmin(req, res, next) {
// 	if (req.body.isAdmin) next();
// 	else
// 		res.status(403).send(
// 			'Sorry but you are not an admin and you do not have access'
// 		);
// }

// function addOne(req, res, next) {
// 	req.data = [];
// 	req.data.push('agrego data 1');
// 	next();
// }

// function addTwo(req, res, next) {
// 	req.data.push('agrego data 2');
// 	next();
// }

// function modParams(req, res, next) {
// 	if (!req.query.name) req.query.name = 'SIN NOMBRE';
// 	else req.query.name += 'Modificado';
// 	next();
// }

// app.use(express.json());

// app.post('dashboard', isAdmin, (req, res) => {
// 	res.send('You are an admin');
// });

// app.get('/add', addOne, addTwo, modParams, (req, res) => {
// 	const { data, query } = req;
// 	res.json({ data, query });
// });

// EJEMPLO MULTER
const multer = require('multer');

const myStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		const filename = `${Date.now()}-${file.originalname}`;
		cb(null, filename);
	},
});

const upload = multer({ storage: myStorage });

app.post('/uploadfile', upload.single('myFile'), (req, res) => {
	// req.file me lo da como resultado de la subida con multer
	const file = req.file;
	console.log(file);
	if (!file) {
		return res.status(400).send('Error subiendo el archivo');
	}
	res.status(200).json({
		status: 'Archivo subido con exito',
		link: __dirname + '/uploads/' + file.filename,
	});
});

app.listen(port);
