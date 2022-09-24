// let randomNumber = [];

// const saveRandomNumber = {};

// for (let i = 0; i < 10000; i++) {
//     randomNumber.push(Math.ceil(Math.random() * 20));
// }

// const same = (arr, number) => {
//     let count = 0;
//     arr.forEach((item) => {
//         if (item == number) count++;
//     });
//     return count;
// };

// const randomNumberKeys = randomNumber.reduce((acc, item) => {
//     acc[item] = same(randomNumber, item);

//     return acc;
// }, {});

// console.log(randomNumberKeys);

// ESTE EJERCICIO LO HIZO EL PROFE

// const getRandom = () => Math.ceil(Math.random() * 20);
// const numbers = {};

// for (let i = 0; i < 10; i++) {
//     const number = getRandom();
//     if (!numbers[number]) numbers[number] = 0;
//     numbers[number]++;
// }

// console.log(numbers);

const products = [
    { id: 1, nombre: "Escuadra", precio: 323 },
    { id: 2, nombre: "Calculadora", precio: 234 },
    { id: 3, nombre: "Globo tarraqueo", precio: 45 },
    { id: 4, nombre: "Paleta pintura", precio: 456 },
    { id: 5, nombre: "Reloj", precio: 67 },
    { id: 6, nombre: "Agenda", precio: 78 },
];

const getProductsNames = products.map((item) => item.nombre).join(", ");

const totalPrice = products.reduce((acc, item) => {
    return acc + item.precio;
}, 0);

const mediaPrice = totalPrice / products.length;

const getAllPrices = (products) => products.map((price) => price.precio);

const getMinPrice = (products) => {
    const minor = Math.min(...getAllPrices(products));
    return minor;
};

const getMaxPrice = (products) => {
    const max = Math.max(...getAllPrices(products));
    return max;
};

const getProductByPrice = (products, price) => {
    const objectProduct = products.find((product) => product.precio == price);

    return objectProduct.nombre;
};

const info = {
    namesProducts: getProductsNames,
    total: totalPrice,
    mediaPrice: mediaPrice,
    ProductMinPrice: getProductByPrice(products, getMinPrice(products)),
    ProductMaxPrice: getProductByPrice(products, getMaxPrice(products)),
};

console.log(info);
