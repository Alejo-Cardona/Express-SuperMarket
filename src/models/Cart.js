import fs from 'fs'

class Cart {
    constructor() {
        this.path = '../carrito.json'
        this.path_products = '../productos.json'
    }

    addCart(cart) {
        //desestructurar el objeto que me ingresa
        const {id, products} = cart;

        if(!isNaN(id) && Array.isArray(products)) {

            const newCart = {
                id,
                products
            }

            // verifico la existencia de la data
            const existingData = fs.readFileSync(this.path, 'utf8');
            let carts = existingData ? JSON.parse(existingData) : [];
            carts.push(newCart);

            const cartsJSON = JSON.stringify(carts, null, 2);
            fs.writeFileSync(this.path, cartsJSON);
            
            return true;
        } else {
            return false
        }
    }

    getCartElementsById(id) {
        const existingData = fs.readFileSync(this.path, 'utf8')
        const data = JSON.parse(existingData)
        const cart = data.find(element => element.id === id);

        if (cart) {
            return cart;
        } else {
            return false;
        }
        // index === -1 ? console.log("Not found") : console.log(data[index]);
    }

    addElementInCartById(id_cart, id_product) {
        const existingData = fs.readFileSync(this.path, 'utf8')
        const data = JSON.parse(existingData)
        const cart = data.find(element => element.id === id_cart);
        
        if (cart) {
            const {id, products} = cart 
            const find = products.find(element => element.id === id_product)

            if (find) {
                const {quantity} = find
                find.quantity = quantity + 1 
                
                // Encuentra el índice del producto en el array y actualiza ese elemento
                const productIndex = products.findIndex(element =>  element.id === id_product);
                products[productIndex] = find;

                // Guarda el array actualizado en el archivo
                fs.writeFileSync(this.path, JSON.stringify(data, null,  2));
                return true
            } else {
                products.push({id: id_product, quantity: 1})
                fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
                return true
            }
        } else {
            return false;
        }
    }
}

const CartM = new Cart();
export default CartM;