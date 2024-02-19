import CallAPI from "./callAPI";

class ReviewAPI extends CallAPI {
  #endpointFirst = "review";

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

const reviewAPI = new ReviewAPI();

export default reviewAPI;
