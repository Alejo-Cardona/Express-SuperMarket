const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = '../productos.json'
    }

    addProduct(product) {
        //desestructurar el objeto que me ingresa
        const {id, title, description, price, code, stock, status, category, thumbnails} = product;

        //verifico que todos los campos esten correctos y completos
        if (!title || !description || !code || !status || !category || isNaN(id) || isNaN(price) || isNaN(stock)){
            return false;
        }

        let thumbnail_content = thumbnails
        let thumbnails_array = []
        thumbnails_array.push(thumbnail_content)

        const newProduct = {
            id,
            title,
            description,
            price,
            code,
            stock,
            status,
            category,
            thumbnails: thumbnails_array
        }

        // verifico la existencia de la data
        const existingData = fs.readFileSync(this.path, 'utf8');
        // si el archivo esta vacio se le asigna un array si nó, se parsea
        let products = existingData ? JSON.parse(existingData) : [];
        products.push(newProduct);

        const productsJSON = JSON.stringify(products, null, 2);
        fs.writeFileSync(this.path, productsJSON);
    }

    getProducts() {
        // verifico la existencia de la data
        const existingData = fs.readFileSync(this.path, 'utf8')
        if(existingData) {
            const data = JSON.parse(existingData)
            return data;
        } else {
            console.log("La base de datos esta vacia")
        }
    }

    getProductById(id) {
        const existingData = fs.readFileSync(this.path, 'utf8')
        const data = JSON.parse(existingData)
        const product = data.find(element => element.id === id);

        if (product) {
            console.log(product)
            return product;
        } else {
            console.log("Not found")
            return null;
        }
        // index === -1 ? console.log("Not found") : console.log(data[index]);
    }

    updateProduct(id, update) {
        const existingData = fs.readFileSync(this.path, 'utf8')
        const data = JSON.parse(existingData)
        const index = data.findIndex(element => element.id === id);

        if(index >= 0) {
            // Actualizar los campos del producto con los valores proporcionados en el objeto 'update'
            Object.assign(data[index], update);

            // Guardar los cambios en el archivo
            fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
            return true;
        } else {
            return false;
        }
    }

    deleteProduct(id) {
        const existingData = fs.readFileSync(this.path, 'utf8')
        const data = JSON.parse(existingData)

        const newUpdate = data.filter(element => element.id != id);

        if (newUpdate.length > 0) {
            // Guardar los cambios en el archivo
            fs.writeFileSync(this.path, JSON.stringify(newUpdate, null, 2));
            return true;
        } else {
            return false;
        }
    }

}

module.exports = new ProductManager