import CallAPI from "./callAPI";

class CartAPI extends CallAPI {
  #endpointFirst = "cart";

  async get(filters) {
    return await super.get(this.#endpointFirst, filters);
  }

  async getById(id) {
    return await super.getById(this.#endpointFirst, id);
  }

  async post(data) {
    return await super.post(this.#endpointFirst, data);
  }

  async patch(data) {
    return await super.patch(this.#endpointFirst, data);
  }

  async updateById(id, data) {
    return await super.updateById(this.#endpointFirst, id, data);
  }

  async deleteById(id) {
    return await super.deleteById(this.#endpointFirst + "/item", id);
  }
}

const cartAPI = new CartAPI();

export default cartAPI;
