// class User {
//     constructor(name, surname, books = [], pets = []) {
//         this.name = name;
//         this.surname = surname;
//         this.books = books;
//         this.pets = pets;
//     }

//     getFullName() {
//         return `${this.name} ${this.surname}`;
//     }

//     addPet(namePet) {
//         this.pets.push(namePet);
//     }

//     countPets() {
//         return this.pets.length;
//     }

//     addBook(nameBook, nameAuthor) {
//         const infoBook = {
//             name: nameBook,
//             author: nameAuthor,
//         };
//         this.books.push(infoBook);
//     }

//     getBookNames() {
//         let names = this.books.map((bookName) => bookName.name);
//         return names;
//     }

//     getFullAtributte() {
//         return this;
//     }
// }

// const matias = new User("Matias", "Arzamendia");

// console.log(matias.getFullName());
// matias.addPet("Poclin");
// matias.addPet("Arena");
// console.log(matias.countPets());
// matias.addBook("El amor en los tiempos del cólera", "Gabriel García Márquez");
// matias.addBook("Harry Potter y la cámara de los secretos", "J. K. Rowling");
// console.log(matias.getBookNames());

// // console.log(matias.getFullAtributte());
