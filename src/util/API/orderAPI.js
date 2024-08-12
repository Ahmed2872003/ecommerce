import CallAPI from "./callAPI";

class OrderAPI extends CallAPI {
  #endpointFirst = "order";

  async get(endpoint = "") {
    return await super.get(this.#endpointFirst + endpoint, null);
  }
}

const orderAPI = new OrderAPI();

export default orderAPI;
