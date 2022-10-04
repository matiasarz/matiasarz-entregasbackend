class Container {
    constructor(name) {
        this.name = name;
        this.fileSystem = require('fs');
    }

    async saveFile(object) {
        try {
            const filePrev = await this.fileSystem.promises.readFile(
                `./${this.name}.txt`,
                'utf-8'
            );
            const objParseado = JSON.parse(filePrev);
            object.id = objParseado.length + 1;
            await this.fileSystem.promises.writeFile(
                `./${this.name}.txt`,
                JSON.stringify([...objParseado, object])
            );
        } catch (e) {
            object.id = 1;
            await this.fileSystem.promises.writeFile(
                `./${this.name}.txt`,
                JSON.stringify([object])
            );
            console.error('Primer archivo generado');
        }

        return object.id;
    }

    async getFileById(id) {
        try {
            const file = await this.fileSystem.promises.readFile(
                `./${this.name}.txt`,
                'utf-8'
            );
            const arrayObjFiles = JSON.parse(file);
            const objSelected = arrayObjFiles.find((item) => item.id === id);

            return objSelected ? objSelected : null;
        } catch (e) {
            console.error(e);
        }
    }

    async getAllFiles() {
        try {
            const allFiles = await this.fileSystem.promises.readFile(
                `./${this.name}.txt`,
                'utf-8'
            );
            const files = JSON.parse(allFiles);
            return files;
        } catch (e) {
            console.error('No hay archivos');
        }
    }

    async deleteFileById(id) {
        try {
            const response = await this.getAllFiles().then((item) =>
                item.filter((filter) => filter.id !== id)
            );
            await this.fileSystem.promises.writeFile(
                `./${this.name}.txt`,
                JSON.stringify(response)
            );
        } catch (e) {
            console.error(e);
        }
    }

    async deleteAllFiles() {
        try {
            await this.fileSystem.promises.unlink(`./${this.name}.txt`);
        } catch (e) {
            console.error(e);
        }
    }
}

const products = new Container('products');

const createContent = (name, price, thumbnail) => {
    return { name, price, thumbnail };
};

const items = [
    {
        name: 'Manzana',
        price: 100,
        thumbnail:
            'https://i0.wp.com/historiasdelahistoria.com/wordpress-2.3.1-ES-0.1-FULL/wp-content/uploads/2015/09/manzana.jpg?ssl=1',
    },
    {
        name: 'Banana',
        price: 100,
        thumbnail:
            'https://resizer.glanacion.com/resizer/MS-9klbANu7SZPCNW4FwAh_FTt8=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/BJB5RPAYRNEOTK6D7JAHQ6ZCCA.jpg',
    },
    {
        name: 'Naranja',
        price: 100,
        thumbnail:
            'https://www.hogarmania.com/archivos/201211/438-nutricion-naranja-propiedades-xl-1280x720x80xX.jpg',
    },
    {
        name: 'Sandia',
        price: 100,
        thumbnail:
            'https://www.webconsultas.com/sites/default/files/styles/wch_image_schema/public/articulos/valor-nutricional-sandia.jpg',
    },
    {
        name: 'Frutilla',
        price: 100,
        thumbnail:
            'https://jumboargentina.vtexassets.com/arquivos/ids/421110/Frutilla-Por-Kg-1-10917.jpg?v=636481016510630000',
    },
];

const generateProducts = () => {
    let count = 0;
    const interval = setInterval(() => {
        if (count < items.length) {
            products.saveFile(
                createContent(
                    items[count].name,
                    items[count].price,
                    items[count].thumbnail
                )
            );
            count++;
        } else clearInterval(interval);
    }, 500);

    return '<h1>Recargué la página</h1>';
};

module.exports = { Container, generateProducts };
