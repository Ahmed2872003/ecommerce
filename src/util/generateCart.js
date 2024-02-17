// Modules
import axios from "axios";
// utils
import CustomQuery from "./CustomQuery";

export default async function generateCart(LSCart) {
  const generatedCart = {};

  const LSCartMap = new Map(LSCart);

  const products = await getProducts(LSCart);

  const subtotal = calcSubtotal(LSCartMap, products);

  generatedCart["subtotal"] = subtotal;
  generatedCart["Products"] = products;

  for (const product of generatedCart["Products"]) {
    product["neededQuantity"] = LSCartMap.get(`${product.id}`);
  }

  return generatedCart;
}

async function getProducts(LSCart) {
  const productsPromises = [];

  for (const [productId] of LSCart) {
    const query = CustomQuery.stringRepOf({ id: { eq: productId } });
    productsPromises.push(axios.get(axios.BASE_URL + `/product?${query}`));
  }

  const productsResponses = await Promise.all(productsPromises);

  return productsResponses.map((productRes) => {
    const {
      data: {
        data: { products },
      },
    } = productRes;

    return products[0];
  });
}

function calcSubtotal(LSCartMap, products) {
  return products.reduce((acc, product) => {
    return acc + product.price * LSCartMap.get(`${product.id}`);
  }, 0);
}
