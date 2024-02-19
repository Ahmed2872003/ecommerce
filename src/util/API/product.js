import CallAPI from "./callAPI";

class ProductAPI extends CallAPI {
  #endpointFirst = "product";

  async get(filters) {
    return await super.get(this.#endpointFirst, filters);
  }

  async getById(id) {
    return await super.getById(this.#endpointFirst, id);
  }

  async post(data) {
    return await super.post(this.#endpointFirst, data);
  }

  async updateById(id, data) {
    return await super.updateById(this.#endpointFirst, id, data);
  }

  async deleteById(id) {
    return await super.deleteById(this.#endpointFirst, id);
  }
}

const productAPI = new ProductAPI();

export default productAPI;
