class Contenedor {
    constructor(name) {
        this.name = name;
        this.fileSystem = require("fs");
    }

    saveFile(object) {
        let filePrev;
        try {
            filePrev = this.fileSystem.readFileSync(
                `./${this.name}.txt`,
                "utf-8"
            );
        } catch (e) {
            console.log(`Error: ${e}`);
            filePrev = undefined;
        }

        if (!filePrev) {
            object.id = this.getAllFiles().length;
            this.fileSystem.writeFileSync(
                `./${this.name}.txt`,
                JSON.stringify([object])
            );
        } else {
            object.id = this.getAllFiles().length;
            const objParseado = JSON.parse(filePrev);
            this.fileSystem.writeFileSync(
                `./${this.name}.txt`,
                JSON.stringify([...objParseado, object])
            );
        }
        return object.id;
    }

    getFileById(id) {
        const file = this.fileSystem.readFileSync(
            `./${this.name}.txt`,
            "utf-8"
        );

        const arr = JSON.parse(file);

        const objSelected = arr.filter((item) => item.id === id);

        return objSelected.length ? objSelected : null;
    }

    getAllFiles() {
        let archivoParseado;
        try {
            archivoParseado = this.fileSystem.readFileSync(
                `./${this.name}.txt`,
                "utf-8"
            );
        } catch (e) {
            console.log(`Error: ${e}`);
            archivoParseado = undefined;
        }
        const files = archivoParseado ? JSON.parse(archivoParseado) : [];

        return files;
    }

    deleteFileById(id) {
        this.fileSystem.writeFileSync(
            `./${this.name}.txt`,
            JSON.stringify(this.getAllFiles().filter((item) => item.id !== id))
        );
    }

    deleteAllFiles() {
        this.fileSystem.unlinkSync(`./${this.name}.txt`);
    }
}

const continent = new Contenedor("pais");

continent.saveFile({
    southAmerica: ["Paraguay", "Brasil", "Brasil", "Peru"],
    area: "17.84 millones km2",
    population: "422.5 millones (2016)",
});
