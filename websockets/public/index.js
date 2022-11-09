const socket = io();
const formProduct = document.getElementById('form');
const template = document.getElementById('templateListProduct').content;
const fragment = document.createDocumentFragment();
const listContainer = document.querySelector('.listContainer');
const title = document.getElementById('title');

const getListProduct = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

const imageDefault =
	'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png';

formProduct.addEventListener('submit', (e) => {
	e.preventDefault();
	let array = [];
	formProduct.querySelectorAll('div input').forEach((item) => {
		array.push([item.name, item.value]);
		item.value = '';
		if (item.name === 'title') item.focus();
	});
	console.log(array);

	socket.emit('updateView', array);
});

socket.on('sendProducts', (message) => {
	if (!message.products.length) {
		listContainer.innerHTML =
			'<h1 style="color: #fff;">No se encontraron products</h1>';
		return;
	}
	listContainer.innerText = '';
	message.products.map((product) => {
		console.log(product);
		const clone = template.cloneNode(true);
		clone.querySelector('.listItem h2').innerText = product.title;
		clone.querySelector('.listItem p').innerText = product.price;
		if (
			!product.thumbnail.includes('http') ||
			!product.thumbnail.includes('https')
		) {
			clone.querySelector('.listItem picture img').src = imageDefault;
		} else
			clone.querySelector('.listItem picture img').src =
				product.thumbnail;
		clone.querySelector('.listItem picture img').alt = product.title;

		fragment.appendChild(clone);
	});
	listContainer.appendChild(fragment);
});
